-- AlterTable
ALTER TABLE `client` ADD COLUMN `emailEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `whatsappEnabled` BOOLEAN NOT NULL DEFAULT false;
