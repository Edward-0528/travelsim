# Database Update Instructions

## To Add Onboarding Fields to Profiles Table:

Run this SQL in your Supabase SQL Editor to add the new onboarding fields:

```sql
-- Add the new onboarding columns to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS travel_start_date date,
ADD COLUMN IF NOT EXISTS travel_end_date date,
ADD COLUMN IF NOT EXISTS number_of_sims integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS device_imei text,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
```

## What This Adds:

- **travel_start_date**: When the user's trip begins
- **travel_end_date**: When the user's trip ends  
- **number_of_sims**: How many SIM cards they need (1-10)
- **device_imei**: The user's phone IMEI number
- **onboarding_completed**: Whether they've completed the setup process

## Onboarding Flow:

1. **New users** who sign up will automatically see the onboarding modal
2. **Existing users** who already have `onboarding_completed = true` won't see it
3. **The modal collects** travel dates, number of SIMs needed, and device IMEI
4. **After completion**, users can proceed to purchase their SIM plans

## Testing:

1. Sign up with a new account
2. The onboarding modal should appear automatically
3. Complete all 3 steps (dates, SIMs, IMEI)
4. The modal should close and not appear again for that user
