import ResepMakananService from "../service/ResepMakanan-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await ResepMakananService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user=req.user;
        const resepId = req.params.resepId;
        const result= await ResepMakananService.get(user,resepId);
        res.status(200).json({

         data:result,   
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next)=>{
    try {
        const user=req.user;
        const resepId = req.params.resepId;
        const request = req.body;
        request.id = resepId;
        const result = await ResepMakananService.update (user, request);
        res.status(200).json({
            data:result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const resepId = req.params.resepId;
        
        await ResepMakananService.remove(user, resepId);
        res.status(200).json({
            data: "OK BROK"
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {

    try {
        const request = {
            page: req.query.page,
            size: req.query.size,
            nama: req.query.nama,
            bahan: req.query.bahan,
        }

        const result = await ResepMakananService.search(request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (e) {
        next(e)
    }
}

export default{create,get,update,remove,search}
