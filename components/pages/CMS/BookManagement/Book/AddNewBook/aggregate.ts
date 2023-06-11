import { MediaType } from 'enums/media'
import { AggregationPipeline } from 'types/mongo'

export function getCMSRoomDetailPipeline(buildiumUnitId: number): AggregationPipeline {
  return [
    {
      $lookup: {
        from: 'Property',
        localField: 'buildiumPropertyId',
        foreignField: 'buildiumPropertyId',
        as: 'property'
      }
    },
    {
      $unwind: {
        path: '$property',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        isDeleted: {
          $ne: true
        },
        buildiumUnitId: {
          $eq: buildiumUnitId
        }
      }
    },
    {
      $lookup: {
        from: 'Listing',
        localField: 'buildiumUnitId',
        foreignField: 'buildiumUnitId',
        as: 'listing'
      }
    },
    {
      $unwind: {
        path: '$listing',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'Media',
        let: {
          buildiumUnitId: '$buildiumUnitId'
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$buildiumUnitId', '$$buildiumUnitId']
                  },
                  {
                    $eq: ['$type', MediaType.IMAGE]
                  }
                ]
              }
            }
          },
          {
            $addFields: {
              id: {
                $toString: '$_id'
              }
            }
          },
          {
            $unset: '_id'
          }
        ],
        as: 'media'
      }
    },
    {
      $sort: { 'media.unitOrder': 1 }
    },
    {
      $lookup: {
        from: 'Media',
        let: {
          mainMediaId: {
            $toString: '$mainMediaId'
          }
        },
        pipeline: [
          {
            $addFields: {
              id: {
                $toString: '$_id'
              }
            }
          },
          {
            $unset: '_id'
          },
          {
            $match: {
              $expr: {
                $eq: ['$id', '$$mainMediaId']
              }
            }
          }
        ],
        as: 'mainUnitMedia'
      }
    },
    {
      $project: {
        _id: '$$REMOVE',
        id: '$_id',
        buildiumUnitId: 1,
        buildiumPropertyId: 1,
        name: 1,
        address: '$property.address',
        availableDate: '$listing.availableDate',
        availableStartDate: 1,
        availableEndDate: 1,
        bathRoomType: 1,
        currentTenants: 1,
        isFurnished: 1,
        vrTourUrl: 1,
        price: 1,
        description: 1,
        mainUnitMedia: 1,
        media: 1
      }
    }
  ]
}
