const steps = [0, 1, 2, 3] as const;
export type Step = (typeof steps)[number];

type StepInput<T extends Step> = T extends 0
  ? { id: string } | undefined
  : T extends 1
  ? { audio: File; text: string } | undefined
  : T extends 2
  ? { image?: File } | undefined
  : T extends 3
  ? null
  : never;

export type RequestBodies = {
  [key in Step]: StepInput<key>;
};
