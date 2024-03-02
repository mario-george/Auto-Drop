import {
  Schema,
  model,
  Document,
  Types,
  SchemaDefinitionProperty,
  PaginateModel,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
interface ImageType {
  original: string;
  thumbnail: string;
  default: boolean;
  alt: string;
}

interface ValueType {
  name: string;
  price: number;
  original_price: number;
  quantity: number;
  is_default: boolean;
  property_id: number;
  sku_id: number;
  salla_value_id?: string;
  salla_variant_id?: string;
  mpn?: string | number;
  gtin?: string | number;
  display_value: string;
  sku: string;
  vat: boolean;
}

interface OptionType {
  name: string;
  display_type: string;
  values: ValueType[];
  salla_option_id: string;
}

interface ShippingAttributes {
  name: string;
  price: number;
}

interface ProductSchema {
  name: string;
  description: string;
  price: number;
  main_price: number;
  vendor_commission: number;
  vendor_price: number;
  quantity: number;
  sku: string;
  images: SchemaDefinitionProperty<ImageType[] | null>;
  options: SchemaDefinitionProperty<OptionType[] | null>;
  metadata_title: string;
  metadata_description: string;
  product_type: string;
  original_product_id: number | string;
  salla_product_id: number | string | undefined;
  merchant: SchemaDefinitionProperty<Types.ObjectId>;
  require_shipping: boolean;
  shipping: ShippingAttributes;
  sku_id: string;
  vat: any;
  category_id?: number;
  category_name?: string;
  first_level_category_name?: string;
  second_level_category_name?: string;
  target_sale_price?: string;
  target_original_price?: string;
  variantsArr?: any;
  commissionPercentage?:boolean,
  showDiscountPrice?: boolean,
}

interface ProductDocument extends Document, ProductSchema {}

const options = {
  name: { type: String, default: null, trim: true },
  sku_id: { type: String, default: null, trim: true },
  description: { type: String, default: null, trim: true },
  price: { type: Number, default: 0, integer: true },
  main_price: { type: Number, default: 0, integer: true },
  vendor_commission: { type: Number, default: 0, integer: true },
  vendor_price: { type: Number, default: 0, integer: true },
  quantity: { type: Number, default: 0, integer: true },
  sku: { type: String, default: null, trim: true },
  images: { type: Array, default: [] },
  options: { type: Array, default: [] },
  metadata_title: { type: String, default: null, trim: true },
  metadata_description: { type: String, default: null, trim: true },
  product_type: { type: String, default: null, trim: true },
  original_product_id: {
    type: String || Number,
    default: null,
    trim: true,
    integer: true,
  },
  salla_product_id: {
    type: String || Number,
    default: null,
    trim: true,
    integer: true,
  },
  merchant: { type: String, default: null, ref: "User", trim: true },
  require_shipping: {
    type: Boolean,
    default: true,
  },
  shipping: [
    {
      shipping_method: {
        type: String,
      },
      service_name: {
        type: String,
      },
      estimated_delivery_time: {
        type: String,
      },
      tracking_available: {
        type: Boolean,
      },
      freight: {
        type: Object,
        cent: { type: String },
        currency: Object,
        currency_code: { type: String, default: "SAR" },
      },
    },
  ],
  vat: {
    type: Boolean,
    default: false,
  },
  category_id: { type: Number, default: null },
  category_name: { type: String, default: null },
  target_original_price: { type: Number, default: null },
  target_sale_price: { type: Number, default: null },
  first_level_category_name: { type: String, default: null },
  second_level_category_name: { type: String, default: null },
  variantsArr: { type: Array, default: [] },
  commissionPercentage: { type: Boolean, default: true },
  showDiscountPrice: { type: Boolean, default: false },
};

const schema = new Schema<ProductSchema>(options, { timestamps: true });
schema.index({ "$**": "text" });
// schema.plugin(mongoosePaginate);

const Product = model<ProductSchema, PaginateModel<ProductDocument>>(
  "Product",
  schema,
  "products"
);

export {
  Product,
  ProductSchema,
  ProductDocument,
  ImageType,
  ValueType,
  OptionType,
};
