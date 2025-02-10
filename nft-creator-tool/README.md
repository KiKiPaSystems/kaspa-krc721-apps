# NFT Generator

This project is a **NFT Collection Generator** that layers images to create unique NFTs. Users can define trait orders, provide a collection name, CID, and description, and generate a full set of NFTs with metadata.

## 🚀 Features
- Upload trait layers via ZIP.
- Define trait stacking order.
- Generates images and metadata with a proper CID.
- Displays a progress bar while processing.
- View generated NFTs via a web UI.

## 🔧 Installation & Usage
1. **Install Dependencies**  
   ```sh
   bun install
   ```
2. **Run the Server**  
   ```sh
   bun run src/server.ts
   ```
3. **Access the App**  
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## 📂 File Structure
- **`public/`** – Frontend (HTML, CSS, JS).  
- **`src/routes/`** – API routes (upload, generate, progress, output).  
- **`src/utils/`** – Image processing, metadata, and helpers.  
- **`src/server.ts`** – Main entry point.  

## 🖼️ Viewing Generated NFTs
Once the process is complete, view your collection at:  
```
http://localhost:8080/output/{collectionName}
```

## 🛠️ Requirements
- **Bun**  
- **Node.js**  
- **Sharp** (for image processing)  

Enjoy generating your own NFT collections! 🚀  