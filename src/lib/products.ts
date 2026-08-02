import { supabase, isSupabaseConfigured } from './supabase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  old_price?: number;
  oldPrice?: number;
  category: string;
  sizes: string[];
  colors?: string[];
  stock_quantity: number;
  image: string;
  images?: string[];
  description?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
}

export const INITIAL_SEED_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: 999,
    oldPrice: 1299,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Faded Grey"],
    stock_quantity: 45,
    image: "/images/home/new-1.png",
    images: ["/images/home/new-1.png", "/images/home/new-4.png"],
    is_active: true,
    is_featured: true,
    description: "Engineered 450GSM heavy cotton oversized streetwear t-shirt.",
  },
  {
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: 1999,
    oldPrice: 2499,
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    colors: ["Off White"],
    stock_quantity: 12,
    image: "/images/home/new-2.png",
    images: ["/images/home/new-2.png", "/images/home/new-5.png"],
    is_active: true,
    is_featured: true,
    description: "Heavyweight French Terry cotton hoodie with custom motorsport-inspired graphics.",
  },
  {
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: 1199,
    oldPrice: 1499,
    category: "T-Shirts",
    sizes: ["S", "M", "L"],
    colors: ["Charcoal"],
    stock_quantity: 3,
    image: "/images/home/new-3.png",
    images: ["/images/home/new-3.png", "/images/home/new-1.png"],
    is_active: true,
    is_featured: false,
    description: "Hand-finished motorsport livery oversized graphic tee.",
  },
  {
    name: "STREET LEGEND",
    slug: "minimal-cream-hoodie",
    price: 2099,
    oldPrice: 2499,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream"],
    stock_quantity: 28,
    image: "/images/home/new-5.png",
    images: ["/images/home/new-5.png"],
    is_active: true,
    is_featured: false,
    description: "Minimalist cream heavyweight hoodie with subtle high-density print.",
  },
];

// Shared global fallback store across hot-reloads and API contexts
declare global {
  var globalProductStore: Product[] | undefined;
}

if (!global.globalProductStore) {
  global.globalProductStore = INITIAL_SEED_PRODUCTS.map((p, i) => ({
    ...p,
    id: String(i + 1),
  }));
}

let inMemoryStore: Product[] = global.globalProductStore;

/**
 * Format product object to ensure consistent field names
 */
function normalizeProduct(item: any): Product {
  return {
    id: String(item.id),
    name: item.name || 'Unnamed Product',
    slug: item.slug || String(item.id),
    price: Number(item.price || 0),
    oldPrice: item.old_price ? Number(item.old_price) : item.oldPrice ? Number(item.oldPrice) : undefined,
    old_price: item.old_price ? Number(item.old_price) : item.oldPrice ? Number(item.oldPrice) : undefined,
    category: item.category || 'T-Shirts',
    sizes: Array.isArray(item.sizes) ? item.sizes : ['S', 'M', 'L', 'XL'],
    colors: Array.isArray(item.colors) ? item.colors : ['Black'],
    stock_quantity: Number(item.stock_quantity ?? item.stock ?? 10),
    image: item.image || '/images/home/new-1.png',
    images: Array.isArray(item.images) ? item.images : [item.image || '/images/home/new-1.png'],
    description: item.description || '',
    is_active: item.is_active ?? true,
    is_featured: item.is_featured ?? false,
    created_at: item.created_at || new Date().toISOString(),
  };
}

/**
 * Fetch products from Supabase (with fallback to in-memory store if DB unconfigured or empty)
 */
export async function getProducts(options?: {
  category?: string;
  search?: string;
  featuredOnly?: boolean;
  includeInactive?: boolean;
}): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });

      if (!options?.includeInactive) {
        query = query.eq('is_active', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (options?.category && options.category !== 'ALL') {
        query = query.eq('category', options.category);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        let result = data.map(normalizeProduct);
        if (options?.search) {
          const s = options.search.toLowerCase();
          result = result.filter(p => p.name.toLowerCase().includes(s) || p.slug.toLowerCase().includes(s));
        }
        return result;
      }
    } catch (_) {}
  }

  // Fallback to in-memory store
  let result = [...inMemoryStore];
  if (!options?.includeInactive) {
    result = result.filter(p => p.is_active);
  }
  if (options?.featuredOnly) {
    result = result.filter(p => p.is_featured);
  }
  if (options?.category && options.category !== 'ALL') {
    result = result.filter(p => p.category === options.category);
  }
  if (options?.search) {
    const s = options.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(s) || p.slug.toLowerCase().includes(s));
  }
  return result;
}

/**
 * Get single product by ID or Slug from Supabase or memory store
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  if (!idOrSlug) return null;

  if (isSupabaseConfigured()) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      
      let data: any = null;

      // 1. Try querying by slug first (most common for storefront URLs)
      const slugRes = await supabase.from('products').select('*').eq('slug', idOrSlug).maybeSingle();
      if (slugRes.data) {
        data = slugRes.data;
      }

      // 2. Try querying by UUID ID if it looks like a valid UUID
      if (!data && isUuid) {
        const idRes = await supabase.from('products').select('*').eq('id', idOrSlug).maybeSingle();
        if (idRes.data) {
          data = idRes.data;
        }
      }

      // 3. Fallback string ID match if stored as string/integer
      if (!data && !isUuid) {
        const strIdRes = await supabase.from('products').select('*').eq('id', idOrSlug).maybeSingle();
        if (strIdRes.data) {
          data = strIdRes.data;
        }
      }

      if (data) {
        return normalizeProduct(data);
      }
    } catch (err: any) {
      console.error('Error fetching product by ID or Slug from Supabase:', err?.message);
    }
  }

  // Fallback to in-memory store
  const found = inMemoryStore.find(p => String(p.id) === String(idOrSlug) || p.slug === idOrSlug);
  return found ? normalizeProduct(found) : null;
}


/**
 * Create a new product in Supabase
 */
export async function createProduct(payload: Partial<Product>): Promise<Product> {
  const newProduct = normalizeProduct({
    ...payload,
    id: payload.id || String(Date.now()),
    created_at: new Date().toISOString(),
  });

  if (isSupabaseConfigured()) {
    try {
      const dbPayload = {
        name: newProduct.name,
        slug: newProduct.slug,
        price: newProduct.price,
        old_price: newProduct.oldPrice || null,
        category: newProduct.category,
        sizes: newProduct.sizes,
        colors: newProduct.colors,
        stock_quantity: newProduct.stock_quantity,
        image: newProduct.image,
        images: newProduct.images,
        description: newProduct.description,
        is_active: newProduct.is_active,
        is_featured: newProduct.is_featured,
      };

      const { data, error } = await supabase.from('products').insert([dbPayload]).select('*').single();

      if (!error && data) {
        return normalizeProduct(data);
      }
    } catch (_) {}
  }

  inMemoryStore.unshift(newProduct);
  return newProduct;
}

/**
 * Update an existing product in Supabase
 */
export async function updateProduct(id: string, payload: Partial<Product>): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload: any = {};
      if (payload.name !== undefined) dbPayload.name = payload.name;
      if (payload.slug !== undefined) dbPayload.slug = payload.slug;
      if (payload.price !== undefined) dbPayload.price = Number(payload.price);
      if (payload.oldPrice !== undefined || payload.old_price !== undefined) {
        dbPayload.old_price = payload.oldPrice ? Number(payload.oldPrice) : payload.old_price ? Number(payload.old_price) : null;
      }
      if (payload.category !== undefined) dbPayload.category = payload.category;
      if (payload.sizes !== undefined) dbPayload.sizes = payload.sizes;
      if (payload.colors !== undefined) dbPayload.colors = payload.colors;
      if (payload.stock_quantity !== undefined) dbPayload.stock_quantity = Number(payload.stock_quantity);
      if (payload.image !== undefined) dbPayload.image = payload.image;
      if (payload.images !== undefined) dbPayload.images = payload.images;
      if (payload.description !== undefined) dbPayload.description = payload.description;
      if (payload.is_active !== undefined) dbPayload.is_active = payload.is_active;
      if (payload.is_featured !== undefined) dbPayload.is_featured = payload.is_featured;

      const { data, error } = await supabase.from('products').update(dbPayload).eq('id', id).select('*').single();

      if (!error && data) {
        return normalizeProduct(data);
      }
    } catch (_) {}
  }

  const idx = inMemoryStore.findIndex(p => String(p.id) === String(id));
  if (idx !== -1) {
    inMemoryStore[idx] = normalizeProduct({ ...inMemoryStore[idx], ...payload });
    return inMemoryStore[idx];
  }
  return null;
}

/**
 * Delete a product from Supabase
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (_) {}
  }

  const initialLen = inMemoryStore.length;
  inMemoryStore = inMemoryStore.filter(p => String(p.id) !== String(id));
  return inMemoryStore.length < initialLen;
}
