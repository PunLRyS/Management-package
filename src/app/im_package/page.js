import Link from "next/link";
export default function ImportPackagePage() {
    return (
      <main>
        <div className="flex space-x-4">
          <Link href="/im_package/SearchProduct" className="style-button">
          Go to the inventory view page
          </Link>
          <Link href="/im_package/AddProduct" className="style-button">
          Go to the add product view page
          </Link>
          <Link href="/im_package/BillProduct" className="style-button">
          Go to the bill import package view page
          </Link>
        </div>
      </main>
    );
  }