"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const HouseCard = ({ house, isloading, keys }) => {
  console.log("house", house);

  
  return (
    <>
    <Link href={`/singlepage/${house?._id}`}>
      <div
      href={`/singlepage/${house?._id}`}
        className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          {house?.image ? (
            <Image
              src={house.image}
              alt="House Image"
              width={300}
              height={200}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
              className="rounded-md"
            />
          ) : (
            <div className="w-full h-[200px] bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2">{house?.Housename}</h2>
        <p className="text-gray-600 mb-2">{house?.address}</p>

        <div className="flex items-center mb-2">
          <span className="text-green-500 font-semibold">Category: </span>
          <span>{house?.category}</span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-semibold">Price: </span>
          {house?.discountPrice > 0 ? (
            <>
              <span className="text-red-500 line-through">
                ${house?.regularPrice}
              </span>
              <span className="ml-2 text-green-500">
                ${house?.discountPrice}
              </span>
            </>
          ) : (
            <span>${house?.regularPrice}</span>
          )}
        </div>

        <div className="flex flex-wrap mb-2">
          {house?.properties?.map((property) => (
            <span
              key={property?._id}
              className="bg-blue-100 text-blue-500 px-2 py-1 rounded-sm mr-2 mb-2"
            >
              {property.parking && "Parking"}
              {property.furnished && " Furnished"}
              {property.other && " Other"}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-2">
          Bedrooms: {house?.numberbed} | Bathrooms: {house?.numberbath}
        </p>

        <p className="text-gray-600">{house?.description}</p>
      </div>
      </Link>
    </>
  );
};

export default HouseCard;
