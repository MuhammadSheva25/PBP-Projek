-- CreateTable
CREATE TABLE `ResepMakanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `bahan` VARCHAR(1000) NOT NULL,
    `langkahpembuatan` VARCHAR(255) NOT NULL,
    `idpembuat` VARCHAR(100) NOT NULL,
    `tgldibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ResepMakanan` ADD CONSTRAINT `ResepMakanan_idpembuat_fkey` FOREIGN KEY (`idpembuat`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
