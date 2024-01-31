import supertest from "supertest";
import {
    createTestUser,
    removeAllTestResepMakanan,
    removeTestUser
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe('POST /api/ResepMakanan', function(){
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestResepMakanan();
        await removeTestUser();
    });

    it('should can create ResepMakanan', async () => {
        const result =  await supertest(web)
        .post("/api/ResepMakanan")
        .set('Authorization', 'test')
        .send({
            nama: "test",
            bahan: "test",
            langkahpembuatan: "test"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.nama).toBe("test");
        expect(result.body.data.bahan).toBe("test");
        expect(result.body.data.langkahpembuatan).toBe("test");
    })

    it('should reject if request is not valid', async () => {
        const result =  await supertest(web)
        .post("/api/ResepMakanan")
        .set('Authorization', 'test')
        .send({
            nama: "test",
            bahan: "test",
            // langkahpembuatan: "test"
        });

        logger.info("------------------")
        logger.info(result.body)
        logger.info("------------------")

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

