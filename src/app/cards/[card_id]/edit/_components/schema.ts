import { z } from 'zod';

export const updateCardSchema = z.object({
  // accessCount: z.number().optional(),
  address: z.string().optional(),
  // businessCardBackgroundColor: z.string().optional(),
  // businessCardBackgroundImage: z.string().optional(),
  businessCardName: z.string().optional(),
  companyName: z.string().optional(),
  department: z.string().optional(),
  displayName: z.string(),
  email: z.string().optional(),
  id: z.string(),
  officialPosition: z.string().optional(),
  phoneNumber: z.string().optional(),
  postalCode: z.string().optional(),
  // speakingAudioPath: z.string().optional(),
  // speakingDescription: z.string().optional(),
  // threeDimentionalModel: z.string().optional(),

  prefectures: z.string().optional(),
  cityAndAddress: z.string().optional(),
  buildingAndRoom: z.string().optional(),
});

export type UpdateCardSchemaType = z.infer<typeof updateCardSchema>;
