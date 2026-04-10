import type { SchemaTypeDefinition } from "sanity";

import { caseStudy } from "./caseStudy";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [caseStudy, testimonial];
