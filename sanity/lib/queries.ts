import { groq } from "next-sanity";

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(coalesce(order, 9999) asc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    result,
    clientName,
    industry,
    problem,
    whatWasBuilt,
    toolsUsed,
    status,
    thumbnail
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt desc) {
    _id,
    quote,
    name,
    company,
    photo
  }
`;

export type CaseStudyStatus = "live" | "in progress" | "beta";

export interface CaseStudy {
  _id: string;
  name: string;
  slug: string;
  result: string;
  clientName?: string;
  industry?: string;
  problem?: string;
  whatWasBuilt?: string;
  toolsUsed?: string[];
  status?: CaseStudyStatus;
  thumbnail?: {
    asset?: { _ref: string };
    alt?: string;
  };
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  company?: string;
  photo?: {
    asset?: { _ref: string };
    alt?: string;
  };
}
