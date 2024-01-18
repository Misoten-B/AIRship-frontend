import { z } from 'zod';

export const createCardSchema = z.object({
  address: z.string().optional(),
  businessCardName: z.string().optional(),
  companyName: z.string().optional(),
  department: z.string().optional(),
  displayName: z.string(),
  email: z.string().optional(),
  officialPosition: z.string().optional(),
  phoneNumber: z.string().optional(),
  postalCode: z.string().optional(),
  prefectures: z.string().optional(),
  cityAndAddress: z.string().optional(),
  buildingAndRoom: z.string().optional(),
});

export type CreateCardSchemaType = z.infer<typeof createCardSchema>;
