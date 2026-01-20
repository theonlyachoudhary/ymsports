import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_programs_program_type_tabs_program_type" AS ENUM('camp', 'clinic', 'tournament', 'league');
  CREATE TYPE "public"."enum__pages_v_blocks_programs_program_type_tabs_program_type" AS ENUM('camp', 'clinic', 'tournament', 'league');
  CREATE TYPE "public"."enum_programs_location" AS ENUM('chicago', 'dallas');
  CREATE TYPE "public"."enum_programs_age_range" AS ENUM('6to7', '8to10', '11to13', '14to16');
  CREATE TYPE "public"."enum_programs_sport_type" AS ENUM('football', 'basketball', 'soccer', 'tennis', 'volleyball');
  CREATE TYPE "public"."enum_header_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('instagram', 'facebook', 'youtube', 'twitter', 'linkedin', 'tiktok');
  CREATE TYPE "public"."enum_footer_organization_column_links_link_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_programs_program_type" ADD VALUE 'league';
  CREATE TABLE "pages_blocks_programs_program_type_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"program_type" "enum_pages_blocks_programs_program_type_tabs_program_type"
  );
  
  CREATE TABLE "_pages_v_blocks_programs_program_type_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"program_type" "enum__pages_v_blocks_programs_program_type_tabs_program_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_programs_column_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locations_column_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar DEFAULT '/locations'
  );
  
  CREATE TABLE "footer_organization_column_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_organization_column_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_programs_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_programs_filters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "camps_what_to_expect" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "camps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tournaments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_programs_filters" CASCADE;
  DROP TABLE "_pages_v_blocks_programs_filters" CASCADE;
  DROP TABLE "camps_what_to_expect" CASCADE;
  DROP TABLE "camps" CASCADE;
  DROP TABLE "tournaments" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_featured_program_id_programs_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_programs_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_featured_program_id_programs_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_programs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_camps_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tournaments_fk";
  
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  DROP INDEX "pages_hero_hero_featured_program_idx";
  DROP INDEX "pages_rels_programs_id_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_featured_program_idx";
  DROP INDEX "_pages_v_rels_programs_id_idx";
  DROP INDEX "payload_locked_documents_rels_camps_id_idx";
  DROP INDEX "payload_locked_documents_rels_tournaments_id_idx";
  ALTER TABLE "programs" ALTER COLUMN "location" SET DATA TYPE "public"."enum_programs_location" USING "location"::"public"."enum_programs_location";
  ALTER TABLE "pages_blocks_programs" ADD COLUMN "summary" varchar;
  ALTER TABLE "_pages_v_blocks_programs" ADD COLUMN "summary" varchar;
  ALTER TABLE "programs" ADD COLUMN "summary" varchar NOT NULL;
  ALTER TABLE "programs" ADD COLUMN "address" varchar NOT NULL;
  ALTER TABLE "programs" ADD COLUMN "age_range" "enum_programs_age_range" NOT NULL;
  ALTER TABLE "programs" ADD COLUMN "sport_type" "enum_programs_sport_type" NOT NULL;
  ALTER TABLE "header" ADD COLUMN "cta_button_enabled" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "cta_button_label" varchar DEFAULT 'Register';
  ALTER TABLE "header" ADD COLUMN "cta_button_link_type" "enum_header_cta_button_link_type" DEFAULT 'custom';
  ALTER TABLE "header" ADD COLUMN "cta_button_url" varchar DEFAULT '/register';
  ALTER TABLE "header" ADD COLUMN "cta_button_new_tab" boolean DEFAULT false;
  ALTER TABLE "footer" ADD COLUMN "mission_statement" varchar DEFAULT 'Every parent longs for their children''s safety, to be surrounded by positive influences, and to have a strong sense of belonging.';
  ALTER TABLE "footer" ADD COLUMN "programs_column_title" varchar DEFAULT 'Programs';
  ALTER TABLE "footer" ADD COLUMN "locations_column_title" varchar DEFAULT 'Locations';
  ALTER TABLE "footer" ADD COLUMN "organization_column_title" varchar DEFAULT 'Organization';
  ALTER TABLE "footer" ADD COLUMN "contact_column_title" varchar DEFAULT 'Contact';
  ALTER TABLE "footer" ADD COLUMN "contact_column_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_column_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "bottom_bar_copyright_text" varchar DEFAULT 'Youth Muslim Sports. All rights reserved.';
  ALTER TABLE "pages_blocks_programs_program_type_tabs" ADD CONSTRAINT "pages_blocks_programs_program_type_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_programs_program_type_tabs" ADD CONSTRAINT "_pages_v_blocks_programs_program_type_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_programs_column_links" ADD CONSTRAINT "footer_programs_column_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locations_column_locations" ADD CONSTRAINT "footer_locations_column_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_organization_column_links" ADD CONSTRAINT "footer_organization_column_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_programs_program_type_tabs_order_idx" ON "pages_blocks_programs_program_type_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_programs_program_type_tabs_parent_id_idx" ON "pages_blocks_programs_program_type_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_programs_program_type_tabs_order_idx" ON "_pages_v_blocks_programs_program_type_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_programs_program_type_tabs_parent_id_idx" ON "_pages_v_blocks_programs_program_type_tabs" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_programs_column_links_order_idx" ON "footer_programs_column_links" USING btree ("_order");
  CREATE INDEX "footer_programs_column_links_parent_id_idx" ON "footer_programs_column_links" USING btree ("_parent_id");
  CREATE INDEX "footer_locations_column_locations_order_idx" ON "footer_locations_column_locations" USING btree ("_order");
  CREATE INDEX "footer_locations_column_locations_parent_id_idx" ON "footer_locations_column_locations" USING btree ("_parent_id");
  CREATE INDEX "footer_organization_column_links_order_idx" ON "footer_organization_column_links" USING btree ("_order");
  CREATE INDEX "footer_organization_column_links_parent_id_idx" ON "footer_organization_column_links" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_programs" DROP COLUMN "description";
  ALTER TABLE "pages" DROP COLUMN "hero_featured_program_id";
  ALTER TABLE "pages_rels" DROP COLUMN "programs_id";
  ALTER TABLE "_pages_v_blocks_programs" DROP COLUMN "description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_featured_program_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "programs_id";
  ALTER TABLE "programs" DROP COLUMN "min_age";
  ALTER TABLE "programs" DROP COLUMN "max_age";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "camps_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tournaments_id";
  DROP TYPE "public"."enum_camps_program_type";
  DROP TYPE "public"."enum_camps_location_state";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_camps_program_type" AS ENUM('camp', 'clinic', 'league', 'tournament');
  CREATE TYPE "public"."enum_camps_location_state" AS ENUM('IL', 'TX', 'VA');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'featuredProgram';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'featuredProgram';
  CREATE TABLE "pages_blocks_programs_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_programs_filters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "camps_what_to_expect" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "camps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"program_type" "enum_camps_program_type" DEFAULT 'camp' NOT NULL,
  	"location_city" varchar NOT NULL,
  	"location_state" "enum_camps_location_state" NOT NULL,
  	"venue_name" varchar,
  	"venue_address" varchar,
  	"description" varchar NOT NULL,
  	"full_description" jsonb,
  	"age_min" numeric NOT NULL,
  	"age_max" numeric NOT NULL,
  	"coach_id" integer,
  	"price" numeric NOT NULL,
  	"schedule_days" varchar,
  	"schedule_start_time" varchar,
  	"schedule_end_time" varchar,
  	"start_date" varchar,
  	"end_date" varchar,
  	"registration_link" varchar NOT NULL,
  	"featured_image_id" integer,
  	"program_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tournaments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"date" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_programs_program_type_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_programs_program_type_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_programs_column_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locations_column_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_organization_column_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_programs_program_type_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_programs_program_type_tabs" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_programs_column_links" CASCADE;
  DROP TABLE "footer_locations_column_locations" CASCADE;
  DROP TABLE "footer_organization_column_links" CASCADE;
  ALTER TABLE "programs" ALTER COLUMN "program_type" SET DATA TYPE text;
  ALTER TABLE "programs" ALTER COLUMN "program_type" SET DEFAULT 'camp'::text;
  DROP TYPE "public"."enum_programs_program_type";
  CREATE TYPE "public"."enum_programs_program_type" AS ENUM('camp', 'clinic', 'tournament');
  ALTER TABLE "programs" ALTER COLUMN "program_type" SET DEFAULT 'camp'::"public"."enum_programs_program_type";
  ALTER TABLE "programs" ALTER COLUMN "program_type" SET DATA TYPE "public"."enum_programs_program_type" USING "program_type"::"public"."enum_programs_program_type";
  ALTER TABLE "programs" ALTER COLUMN "location" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_programs" ADD COLUMN "description" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_featured_program_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "programs_id" integer;
  ALTER TABLE "_pages_v_blocks_programs" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_featured_program_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "programs_id" integer;
  ALTER TABLE "programs" ADD COLUMN "min_age" varchar NOT NULL;
  ALTER TABLE "programs" ADD COLUMN "max_age" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "camps_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tournaments_id" integer;
  ALTER TABLE "pages_blocks_programs_filters" ADD CONSTRAINT "pages_blocks_programs_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_programs_filters" ADD CONSTRAINT "_pages_v_blocks_programs_filters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "camps_what_to_expect" ADD CONSTRAINT "camps_what_to_expect_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."camps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "camps" ADD CONSTRAINT "camps_coach_id_coaches_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."coaches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "camps" ADD CONSTRAINT "camps_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "camps" ADD CONSTRAINT "camps_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_programs_filters_order_idx" ON "pages_blocks_programs_filters" USING btree ("_order");
  CREATE INDEX "pages_blocks_programs_filters_parent_id_idx" ON "pages_blocks_programs_filters" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_programs_filters_order_idx" ON "_pages_v_blocks_programs_filters" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_programs_filters_parent_id_idx" ON "_pages_v_blocks_programs_filters" USING btree ("_parent_id");
  CREATE INDEX "camps_what_to_expect_order_idx" ON "camps_what_to_expect" USING btree ("_order");
  CREATE INDEX "camps_what_to_expect_parent_id_idx" ON "camps_what_to_expect" USING btree ("_parent_id");
  CREATE INDEX "camps_coach_idx" ON "camps" USING btree ("coach_id");
  CREATE INDEX "camps_featured_image_idx" ON "camps" USING btree ("featured_image_id");
  CREATE INDEX "camps_program_idx" ON "camps" USING btree ("program_id");
  CREATE UNIQUE INDEX "camps_slug_idx" ON "camps" USING btree ("slug");
  CREATE INDEX "camps_updated_at_idx" ON "camps" USING btree ("updated_at");
  CREATE INDEX "camps_created_at_idx" ON "camps" USING btree ("created_at");
  CREATE INDEX "tournaments_image_idx" ON "tournaments" USING btree ("image_id");
  CREATE INDEX "tournaments_updated_at_idx" ON "tournaments" USING btree ("updated_at");
  CREATE INDEX "tournaments_created_at_idx" ON "tournaments" USING btree ("created_at");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_featured_program_id_programs_id_fk" FOREIGN KEY ("hero_featured_program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_featured_program_id_programs_id_fk" FOREIGN KEY ("version_hero_featured_program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_camps_fk" FOREIGN KEY ("camps_id") REFERENCES "public"."camps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tournaments_fk" FOREIGN KEY ("tournaments_id") REFERENCES "public"."tournaments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_featured_program_idx" ON "pages" USING btree ("hero_featured_program_id");
  CREATE INDEX "pages_rels_programs_id_idx" ON "pages_rels" USING btree ("programs_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_featured_program_idx" ON "_pages_v" USING btree ("version_hero_featured_program_id");
  CREATE INDEX "_pages_v_rels_programs_id_idx" ON "_pages_v_rels" USING btree ("programs_id");
  CREATE INDEX "payload_locked_documents_rels_camps_id_idx" ON "payload_locked_documents_rels" USING btree ("camps_id");
  CREATE INDEX "payload_locked_documents_rels_tournaments_id_idx" ON "payload_locked_documents_rels" USING btree ("tournaments_id");
  ALTER TABLE "pages_blocks_programs" DROP COLUMN "summary";
  ALTER TABLE "_pages_v_blocks_programs" DROP COLUMN "summary";
  ALTER TABLE "programs" DROP COLUMN "summary";
  ALTER TABLE "programs" DROP COLUMN "address";
  ALTER TABLE "programs" DROP COLUMN "age_range";
  ALTER TABLE "programs" DROP COLUMN "sport_type";
  ALTER TABLE "header" DROP COLUMN "cta_button_enabled";
  ALTER TABLE "header" DROP COLUMN "cta_button_label";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_type";
  ALTER TABLE "header" DROP COLUMN "cta_button_url";
  ALTER TABLE "header" DROP COLUMN "cta_button_new_tab";
  ALTER TABLE "footer" DROP COLUMN "mission_statement";
  ALTER TABLE "footer" DROP COLUMN "programs_column_title";
  ALTER TABLE "footer" DROP COLUMN "locations_column_title";
  ALTER TABLE "footer" DROP COLUMN "organization_column_title";
  ALTER TABLE "footer" DROP COLUMN "contact_column_title";
  ALTER TABLE "footer" DROP COLUMN "contact_column_email";
  ALTER TABLE "footer" DROP COLUMN "contact_column_phone";
  ALTER TABLE "footer" DROP COLUMN "bottom_bar_copyright_text";
  DROP TYPE "public"."enum_pages_blocks_programs_program_type_tabs_program_type";
  DROP TYPE "public"."enum__pages_v_blocks_programs_program_type_tabs_program_type";
  DROP TYPE "public"."enum_programs_location";
  DROP TYPE "public"."enum_programs_age_range";
  DROP TYPE "public"."enum_programs_sport_type";
  DROP TYPE "public"."enum_header_cta_button_link_type";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_footer_organization_column_links_link_type";`)
}
