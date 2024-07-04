/*
  Warnings:

  - You are about to drop the column `difficult_level` on the `SportsActivity` table. All the data in the column will be lost.
  - Added the required column `difficulty_level` to the `SportsActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SportsActivity" DROP COLUMN "difficult_level",
ADD COLUMN     "difficulty_level" "DifficultyLevel" NOT NULL;
