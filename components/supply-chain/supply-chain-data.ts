import { SupplyChainData } from './warehouse';

export const supplyChainData: SupplyChainData = {
  "oem": "Global Auto Parts Distributors",
  "warehouses": [
    {
      "warehouseName": "South Regional Warehouse",
      "type": "warehouse",
      "warehouseId": "WH-MUM-001",
      "location": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "coordinates": {
          "latitude": 19.0760,
          "longitude": 72.8777
        }
      },
      "contact": {
        "phone": "+91 22 12345678",
        "email": "wh.mumbai@autoparts.com"
      },
      "warehouseManager": {
        "name": "Rajesh Kumar",
        "id": "EMP-MGR-1001",
        "contact": "+91 9876543210"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1845,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 221,
          "currentStock": 45,
          "status": "Critical"
        },
        {
          "partId": 2,
          "partName": "Air filter",
          "requiredCount": 185,
          "currentStock": 62,
          "status": "Normal"
        },
        {
          "partId": 3,
          "partName": "Brake pads",
          "requiredCount": 166,
          "currentStock": 28,
          "status": "Critical"
        },
        {
          "partId": 4,
          "partName": "Fuel filter",
          "requiredCount": 148,
          "currentStock": 50,
          "status": "Normal"
        },
        {
          "partId": 5,
          "partName": "Clutch kit & plate",
          "requiredCount": 148,
          "currentStock": 35,
          "status": "Critical"
        },
        {
          "partId": 6,
          "partName": "Battery",
          "requiredCount": 129,
          "currentStock": 42,
          "status": "Normal"
        },
        {
          "partId": 7,
          "partName": "Shock absorbers",
          "requiredCount": 111,
          "currentStock": 30,
          "status": "Critical"
        },
        {
          "partId": 8,
          "partName": "Radiator",
          "requiredCount": 92,
          "currentStock": 25,
          "status": "Critical"
        },
        {
          "partId": 9,
          "partName": "Alternator & starter motor",
          "requiredCount": 92,
          "currentStock": 40,
          "status": "Normal"
        },
        {
          "partId": 10,
          "partName": "Suspension joints/brackets",
          "requiredCount": 74,
          "currentStock": 20,
          "status": "Critical"
        },
        {
          "partId": 11,
          "partName": "Wheel bearings",
          "requiredCount": 74,
          "currentStock": 35,
          "status": "Normal"
        },
        {
          "partId": 12,
          "partName": "Timing belt (kit)",
          "requiredCount": 74,
          "currentStock": 15,
          "status": "Critical"
        },
        {
          "partId": 13,
          "partName": "Water pump",
          "requiredCount": 74,
          "currentStock": 28,
          "status": "Critical"
        },
        {
          "partId": 14,
          "partName": "Hoses & pipes",
          "requiredCount": 55,
          "currentStock": 30,
          "status": "Normal"
        },
        {
          "partId": 15,
          "partName": "Steering components",
          "requiredCount": 55,
          "currentStock": 25,
          "status": "Normal"
        },
        {
          "partId": 16,
          "partName": "Rubber bumpers/bushes/mounts",
          "requiredCount": 46,
          "currentStock": 15,
          "status": "Critical"
        },
        {
          "partId": 17,
          "partName": "Exhaust parts (gaskets, bellows)",
          "requiredCount": 46,
          "currentStock": 20,
          "status": "Normal"
        },
        {
          "partId": 18,
          "partName": "Brake disc/caliper/master cyl",
          "requiredCount": 37,
          "currentStock": 12,
          "status": "Critical"
        },
        {
          "partId": 19,
          "partName": "Light bulbs & fuses",
          "requiredCount": 28,
          "currentStock": 18,
          "status": "Normal"
        },
        {
          "partId": 20,
          "partName": "Wiper blades & washers",
          "requiredCount": 28,
          "currentStock": 22,
          "status": "Normal"
        }
      ],
      "totalStores": 8,
      "stores": [
        {
          "storeName": "Mumbai South Store",
          "storeId": "ST-MUM-101",
          "location": "Colaba",
          "manager": "Priya Sharma",
          "contact": "+91 9876543211",
          "totalPartsRequired": 152,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 12,
              "consumed": 18,
              "requiredCount": 30
            },
            {
              "partId": 3,
              "partName": "Brake pads",
              "status": "Critical",
              "inventory": 8,
              "consumed": 15,
              "requiredCount": 23
            }
          ]
        },
        {
          "storeName": "Mumbai North Store",
          "storeId": "ST-MUM-102",
          "location": "Andheri",
          "manager": "Vikram Patel",
          "contact": "+91 9876543212",
          "totalPartsRequired": 168,
          "parts": [
            {
              "partId": 2,
              "partName": "Air filter",
              "status": "Normal",
              "inventory": 25,
              "consumed": 30,
              "requiredCount": 55
            },
            {
              "partId": 6,
              "partName": "Battery",
              "status": "Normal",
              "inventory": 15,
              "consumed": 20,
              "requiredCount": 35
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Chennai Service Center",
      "type": "service",
      "warehouseId": "WH-HYD-005",
      "location": {
        "city": "Chennai",
        "state": "Tamilnadu",
        "country": "India",
        "coordinates": {
          "latitude": 13.0827,
          "longitude": 80.2707
        }
      },
      "contact": {
        "phone": "+91 40 12345678",
        "email": "wh.hyderabad@autoparts.com"
      },
      "warehouseManager": {
        "name": "Rahul Mehta",
        "id": "EMP-MGR-1005",
        "contact": "+91 9876543250"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1580,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 190,
          "currentStock": 38,
          "status": "Critical"
        }
      ],
      "totalStores": 5,
      "stores": [
        {
          "storeName": "Hyderabad West Store",
          "storeId": "ST-HYD-501",
          "location": "HITEC City",
          "manager": "Sneha Reddy",
          "contact": "+91 9876543251",
          "totalPartsRequired": 175,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 14,
              "consumed": 26,
              "requiredCount": 40
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Nashik Service Center",
      "type": "service",
      "warehouseId": "NH-HUF-004",
      "location": {
        "city": "Nashik",
        "state": "Maharashtra",
        "coordinates": {
          "latitude": 19.9993,
          "longitude": 73.7900
        },
      },
      "contact": {
        "phone": "+91 44 12345678",
        "email": "wh.chennai@autoparts.com"
      },
      "warehouseManager": {
        "name": "Karthik Venkat",
        "id": "EMP-MGR-1004",
        "contact": "+91 9876543240"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1650,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 198,
          "currentStock": 42,
          "status": "Critical"
        }
      ],
      "totalStores": 6,
      "stores": [
        {
          "storeName": "Chennai Central Store",
          "storeId": "ST-CHN-401",
          "location": "T. Nagar",
          "manager": "Divya Rajan",
          "contact": "+91 9876543241",
          "totalPartsRequired": 160,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 12,
              "consumed": 18,
              "requiredCount": 30
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Bandra Store",
      "type": "store",
      "warehouseId": "WH-PUN-007",
      "location": {
        "city": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "coordinates": {
          "latitude": 19.0596,
          "longitude": 72.8295
        }
      },
      "contact": {
        "phone": "+91 20 12345678",
        "email": "wh.pune@autoparts.com"
      },
      "warehouseManager": {
        "name": "Sanjay Deshpande",
        "id": "EMP-MGR-1007",
        "contact": "+91 9876543270"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1350,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 162,
          "currentStock": 32,
          "status": "Critical"
        }
      ],
      "totalStores": 5,
      "stores": [
        {
          "storeName": "Pune South Store",
          "storeId": "ST-PUN-701",
          "location": "Hinjewadi",
          "manager": "Manoj Sharma",
          "contact": "+91 9876543271",
          "totalPartsRequired": 140,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 12,
              "consumed": 18,
              "requiredCount": 30
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Surat Store",
      "type": "store",
      "warehouseId": "WH-JAI-009",
      "location": {
        "city": "Surat",
        "state": "Gujarat",
        "country": "India",
        "coordinates": {
          "latitude": 21.1702,
          "longitude": 72.8311
        }
      },
      "contact": {
        "phone": "+91 141 12345678",
        "email": "wh.jaipur@autoparts.com"
      },
      "warehouseManager": {
        "name": "Mahendra Singh",
        "id": "EMP-MGR-1009",
        "contact": "+91 9876543290"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1180,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 142,
          "currentStock": 28,
          "status": "Critical"
        }
      ],
      "totalStores": 3,
      "stores": [
        {
          "storeName": "Jaipur Central Store",
          "storeId": "ST-JAI-901",
          "location": "MI Road",
          "manager": "Rekha Sharma",
          "contact": "+91 9876543291",
          "totalPartsRequired": 120,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 8,
              "consumed": 22,
              "requiredCount": 30
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "North Regional Warehouse",
      "warehouseId": "WH-DEL-002",
      "type": "warehouse",
      "location": {
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "coordinates": {
          "latitude": 28.7041,
          "longitude": 77.1025
        }
      },
      "contact": {
        "phone": "+91 11 12345678",
        "email": "wh.delhi@autoparts.com"
      },
      "warehouseManager": {
        "name": "Amit Singh",
        "id": "EMP-MGR-1002",
        "contact": "+91 9876543220"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1750,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 210,
          "currentStock": 40,
          "status": "Critical"
        },
        {
          "partId": 2,
          "partName": "Air filter",
          "requiredCount": 175,
          "currentStock": 60,
          "status": "Normal"
        }
      ],
      "totalStores": 7,
      "stores": [
        {
          "storeName": "Delhi Central Store",
          "storeId": "ST-DEL-201",
          "location": "Connaught Place",
          "manager": "Neha Gupta",
          "contact": "+91 9876543221",
          "totalPartsRequired": 145,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 10,
              "consumed": 20,
              "requiredCount": 30
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Aligarh Service Station",
      "type": "service",
      "warehouseId": "WH-BLR-003",
      "location": {
        "city": "Aligarh",
        "state": "Uttar Pradesh",
        "country": "India",
        "coordinates": {
          "latitude": 27.8974,
          "longitude": 78.0880
        }
      },
      "contact": {
        "phone": "+91 80 12345678",
        "email": "wh.bangalore@autoparts.com"
      },
      "warehouseManager": {
        "name": "Suresh Reddy",
        "id": "EMP-MGR-1003",
        "contact": "+91 9876543230"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1920,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 230,
          "currentStock": 50,
          "status": "Critical"
        }
      ],
      "totalStores": 9,
      "stores": [
        {
          "storeName": "Bangalore East Store",
          "storeId": "ST-BLR-301",
          "location": "Whitefield",
          "manager": "Arun Kumar",
          "contact": "+91 9876543231",
          "totalPartsRequired": 180,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 15,
              "consumed": 25,
              "requiredCount": 40
            }
          ]
        }
      ]
    },
    {
      "warehouseName": "Jaipur Service Center",
      "type": "service",
      "warehouseId": "WH-CHN-004",
      "location": {
        "city": "Jaipur",
        "state": "Rajastan",
        "coordinates": {
          "latitude": 26.9124,
          "longitude": 75.7873
        },
      },
      "contact": {
        "phone": "+91 44 12345678",
        "email": "wh.chennai@autoparts.com"
      },
      "warehouseManager": {
        "name": "Karthik Venkat",
        "id": "EMP-MGR-1004",
        "contact": "+91 9876543240"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1650,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 198,
          "currentStock": 42,
          "status": "Critical"
        }
      ],
      "totalStores": 6,
      "stores": [
        {
          "storeName": "Chennai Central Store",
          "storeId": "ST-CHN-401",
          "location": "T. Nagar",
          "manager": "Divya Rajan",
          "contact": "+91 9876543241",
          "totalPartsRequired": 160,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 12,
              "consumed": 18,
              "requiredCount": 30
            }
          ]
        }
      ]
    },


    {
      "warehouseName": "Kolkata Store",
      "type": "store",
      "warehouseId": "WH-KOL-006",
      "location": {
        "city": "Kolkata",
        "state": "West Bengal",
        "country": "India",
        "coordinates": {
          "latitude": 22.5726,
          "longitude": 88.3639
        }
      },
      "contact": {
        "phone": "+91 33 12345678",
        "email": "wh.kolkata@autoparts.com"
      },
      "warehouseManager": {
        "name": "Debashish Roy",
        "id": "EMP-MGR-1006",
        "contact": "+91 9876543260"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1420,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 170,
          "currentStock": 35,
          "status": "Critical"
        }
      ],
      "totalStores": 4,
      "stores": [
        {
          "storeName": "Kolkata North Store",
          "storeId": "ST-KOL-601",
          "location": "Salt Lake",
          "manager": "Ananya Chatterjee",
          "contact": "+91 9876543261",
          "totalPartsRequired": 150,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 10,
              "consumed": 20,
              "requiredCount": 30
            }
          ]
        }
      ]
    },

    {
      "warehouseName": "Janakpuri Store",
      "type": "store",
      "warehouseId": "WH-AHM-008",
      "location": {
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "coordinates": {
          "latitude": 28.6219,
          "longitude": 77.0992
        }
      },
      "contact": {
        "phone": "+91 79 12345678",
        "email": "wh.ahmedabad@autoparts.com"
      },
      "warehouseManager": {
        "name": "Vijay Patel",
        "id": "EMP-MGR-1008",
        "contact": "+91 9876543280"
      },
      "operationalStatus": "Active",
      "totalPartsRequired": 1280,
      "partsRequirements": [
        {
          "partId": 1,
          "partName": "Engine oil filter",
          "requiredCount": 154,
          "currentStock": 30,
          "status": "Critical"
        }
      ],
      "totalStores": 4,
      "stores": [
        {
          "storeName": "Ahmedabad East Store",
          "storeId": "ST-AHM-801",
          "location": "Vastrapur",
          "manager": "Priyank Shah",
          "contact": "+91 9876543281",
          "totalPartsRequired": 130,
          "parts": [
            {
              "partId": 1,
              "partName": "Engine oil filter",
              "status": "Critical",
              "inventory": 10,
              "consumed": 20,
              "requiredCount": 30
            }
          ]
        }
      ]
    },

  ],
  "lastUpdated": "2023-11-15T10:30:00Z",
  "systemVersion": "Inventory Management v2.5.1"
}
