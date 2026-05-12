-- CreateTable
CREATE TABLE `DocumentChecklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadRequestDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uploadRequestId` INTEGER NOT NULL,
    `checklistId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `uploadedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UploadRequestDocument` ADD CONSTRAINT `UploadRequestDocument_uploadRequestId_fkey` FOREIGN KEY (`uploadRequestId`) REFERENCES `UploadRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UploadRequestDocument` ADD CONSTRAINT `UploadRequestDocument_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `DocumentChecklist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
