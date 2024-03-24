import {
  faStar,
  faStarHalfStroke,
  faPlus,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
//@ts-nocheck
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function renderRatingStars(rating: any) {
  const filledStars = Math.floor(rating / 20); // Each star represents 20% of the rating
  const remainingPercentage = rating % 20; // Remaining percentage to determine if a half star is needed
  const stars: ReactElement[] = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(
        <div key={i}>
        <Image
          src={`/client/products/fullStar.svg`}
          alt={`full-star`}
          width={12}
          height={12}
          className="relative z-[1]"
        />
        </div>
      );
    } else if (i === filledStars + 1 && remainingPercentage >= 10) {
      stars.push(
        <div key={i}>
     
        <Image
          src={`/client/products/hStar.svg`}
          alt={`half-star`}
          width={12}
          height={12}
          className="relative z-[1]"
        />
        </div>
      );
    } else {
      stars.push(
        <div key={i}>
        <Image
          src={`/client/products/emptyStar.svg`}
          alt={`empty-star`}
          width={12}
          height={12}
          className="relative z-[1]"
        />
        </div>
      );
    }
  }
  return stars;
}
