import {validate} from "../validation/validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";
import { createResepMakananValidation, getResepMakananValidation, searchResepMakananValidation, updateResepMakananValidation } from "../validation/ResepMakanan-validation.js";


const create = async (user, request) => {
    const ResepMakanan = validate(createResepMakananValidation, request);
    ResepMakanan.idpembuat = user.username;

    return prismaClient.resepMakanan.create({
        data: ResepMakanan,
        select: {
            id: true,
            nama: true,
            bahan: true,
            langkahpembuatan: true,
            pembuat: {
                select: {
                    username: true,
                    name: true
                }
            },
            tgldibuat: true
        }
    });
}

const get = async (user, resepId) => {
    resepId = validate(getResepMakananValidation,resepId);

    const resepMakanan=await prismaClient.resepMakanan.findUnique({
        where:{
            id:resepId
        },
        select: {
            id: true,
            nama: true,
            bahan: true,
            langkahpembuatan: true,
            pembuat: {
                select: {
                    username: true,
                    name: true
                }
            },
            tgldibuat: true
        }
    });
    
    if (!resepMakanan){
        throw new ResponseError(404,'ResepMakanan is not found')
    }

    return resepMakanan;
}

const update = async (user, request) => {
    const ResepMakanan = validate(updateResepMakananValidation,request)

    const totalResepMakanan = await prismaClient.resepMakanan.count({
        where: {
            id: ResepMakanan.id,
            idpembuat:user.username
        }
    });

    if(totalResepMakanan !== 1){
        throw new ResponseError(404,'ResepMakanan is not found');
    }

    return prismaClient.resepMakanan.update({
        where: {
            id:ResepMakanan.id
        },
        data: {
            nama: ResepMakanan.nama,
            bahan: ResepMakanan.bahan,
            langkahpembuatan: ResepMakanan.langkahpembuatan,
        },
        select: {
            id: true,
            nama: true,
            bahan: true,
            langkahpembuatan: true,
            pembuat: {
                select: {
                    username: true,
                    name: true
                }
            },
            tgldibuat: true
        }
    })
}

const remove = async (user, resepId) => {
    resepId = validate(getResepMakananValidation, resepId);

    const totalResepMakanan = await prismaClient.resepMakanan.count({
        where: {
            id: resepId,
            idpembuat:user.username
        }
    });

    if(totalResepMakanan !== 1){
        throw new ResponseError(404,'ResepMakanan is not found');
    }

    return prismaClient.resepMakanan.delete({
        where: {
            id: resepId
        }
    })
}

const search = async (request) => {
    request = validate(searchResepMakananValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.bahan) {
        filters.push({
            bahan: {
                contains: request.bahan
            }
        })
    }

    if (request.nama) {
        filters.push({
            nama: {
                contains: request.nama
            }
        })
    }

    const ResepMakanan = await prismaClient.resepMakanan.findMany({
        where: {
            AND: filters,
        },
        take: request.size,
        skip: skip
    }) 

    const totalItem = await prismaClient.resepMakanan.count({
        where: {
            AND: filters
        }
    }) 

    return {
        data: ResepMakanan,
        paging: {
            page: request.size,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size),
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}