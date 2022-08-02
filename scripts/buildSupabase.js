/* eslint-disable */
const { writeFileSync } = require("fs");

require("dotenv").config();

writeFileSync(
	"./libs/initSupabase.ts",
	`
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "${process.env.SUPABASE_URL}",
	"${process.env.SUPABASE_CLIENT_KEY}",
);
`,
);
