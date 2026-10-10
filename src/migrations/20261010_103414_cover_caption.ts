import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cases_locales" ADD COLUMN "cover_caption" varchar;
  ALTER TABLE "_cases_v_locales" ADD COLUMN "version_cover_caption" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cases_locales" DROP COLUMN "cover_caption";
  ALTER TABLE "_cases_v_locales" DROP COLUMN "version_cover_caption";`)
}
