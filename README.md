# Interior Solutions Indonesia - Product Catalog

## Project Overview
A modern, SEO-optimized product catalog for Interior Solutions Indonesia, specializing in glass films, sandblast, and decorative stickers.

## Features
- Dynamic product catalog with SEO-friendly metadata
- Responsive design using Tailwind CSS
- Server-side rendering with Next.js
- Centralized product data management
- Comprehensive SEO optimization

## Project Structure

### Key Directories
- `src/lib/product-data.ts`: Centralized product data management
- `src/app/product/[productId]/page.tsx`: Dynamic product detail pages
- `src/components/ProductCatalog.tsx`: Product listing and categorization
- `public/`: Static assets and SEO files

### SEO Optimization
- Dynamic sitemap generation
- Robots.txt configuration
- Metadata generation for each product
- Structured data for rich search results

## Product Data Structure
Each product in `product-data.ts` includes:
- Basic information (title, description)
- SEO metadata
- Features
- Specifications
- Pricing
- Category

## SEO Metadata Fields
- `metaTitle`: Page title for search results
- `metaDescription`: Concise product description
- `keywords`: Relevant search terms
- `structuredData`: Schema.org compatible metadata

## Development

### Prerequisites
- Node.js
- npm or yarn
- Next.js

### Installation
1. Clone the repository
2. Run `npm install`
3. Start development server: `npm run dev`

## Deployment
- Optimized for Vercel
- Supports static site generation
- Automatic sitemap and robots.txt generation

## Performance Optimization
- Lazy loading of images
- Minimal JavaScript bundle
- Server-side rendering
- Static site generation capabilities

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
Proprietary - Interior Solutions Indonesia
