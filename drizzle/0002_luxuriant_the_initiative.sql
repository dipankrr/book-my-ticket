CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"duration_mins" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "screens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "shows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid,
	"screen_id" uuid,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"base_price" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"city" varchar(100),
	"address" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"screen_id" uuid,
	"row_label" varchar(10),
	"seat_number" integer,
	"seat_type" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "seat_locks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"show_seat_id" uuid,
	"user_id" uuid,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "seat_locks_show_seat_id_unique" UNIQUE("show_seat_id")
);
--> statement-breakpoint
CREATE TABLE "show_seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"show_id" uuid,
	"seat_id" uuid,
	"price" numeric(10, 2) NOT NULL,
	"status" varchar(20) DEFAULT 'available'
);
--> statement-breakpoint
ALTER TABLE "screens" ADD CONSTRAINT "screens_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shows" ADD CONSTRAINT "shows_screen_id_screens_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_screen_id_screens_id_fk" FOREIGN KEY ("screen_id") REFERENCES "public"."screens"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat_locks" ADD CONSTRAINT "seat_locks_show_seat_id_show_seats_id_fk" FOREIGN KEY ("show_seat_id") REFERENCES "public"."show_seats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seat_locks" ADD CONSTRAINT "seat_locks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "show_seats" ADD CONSTRAINT "show_seats_show_id_shows_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."shows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "show_seats" ADD CONSTRAINT "show_seats_seat_id_seats_id_fk" FOREIGN KEY ("seat_id") REFERENCES "public"."seats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_screen_start" ON "shows" USING btree ("screen_id","start_time");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_screen_seat" ON "seats" USING btree ("screen_id","row_label","seat_number");--> statement-breakpoint
CREATE INDEX "idx_seat_locks_expiry" ON "seat_locks" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "idx_seat_locks_showseat_expiry" ON "seat_locks" USING btree ("show_seat_id","expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_show_seat" ON "show_seats" USING btree ("show_id","seat_id");--> statement-breakpoint
CREATE INDEX "idx_show_seats_show_status" ON "show_seats" USING btree ("show_id","status");