import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1748125377053 implements MigrationInterface {
    name = 'InitialMigration1748125377053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "tmdbId" integer NOT NULL, "title" character varying NOT NULL, "overview" character varying, "posterPath" character varying, "releaseDate" character varying, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_movie" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pendiente', "rating" integer, "notes" text, "addedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "movieId" integer, CONSTRAINT "PK_2fe260b71a39352cfebb47ffa4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_movie" ADD CONSTRAINT "FK_13836cd6ae56580075e1bd33967" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_movie" ADD CONSTRAINT "FK_3e731d371b40a498f72b3e57d9d" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_movie" DROP CONSTRAINT "FK_3e731d371b40a498f72b3e57d9d"`);
        await queryRunner.query(`ALTER TABLE "user_movie" DROP CONSTRAINT "FK_13836cd6ae56580075e1bd33967"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_movie"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
