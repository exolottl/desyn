"use server";

import auth from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const completeOnboarding = async (interests: string[]) => {
  const session = await auth();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }
  
  if(interests.length < 2){
    return {success: false, message: "Select atleast 2 interests"}
  }
  try {
    const userId = session.user.id;
    await db
      .update(users)
      .set({
        interest: JSON.stringify(interests),
        onboardingCompleted: true,
      })
      .where(eq(users.id, userId));
      revalidatePath('/')
    return {success: true, message: 'Onboarding Completed successfully'}
  } catch (error) {
    return {success: false, error: error}
  }
};
