import Link from 'next/link';
import Image from 'next/image';

export default function Nav_bar() {
  // const [isXuatDropdownOpen, setXuatDropdownOpen] = useState(false);
  // const [isNhapDropdownOpen, setNhapDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-bgNav text-white p-4 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold px-2 ">
        <Image
          src="/logo.PNG"
          alt="Picture of the author"
          width={50}
          height={50}
        />
        </Link>

        <div className="flex space-x-4">
          <div className="relative">
          <Link href="/ex_package/Summary">
            <button
              className="hover:border-b-2 border-white px-2 py-2 font-semibold"
            >
              Xuất hàng
            </button>
            </Link>
          </div>

          <div className="relative">
            <Link href="/im_package/AddProduct">
            <button
              className="hover:border-b-2 border-white px-2 py-2 font-semibold"
            >
              Nhập hàng
            </button>
            </Link>
          </div>

          <div className="relative">
            <Link href="/Inventory">
            <button className="hover:border-b-2 border-white px-2 py-2 font-semibold">
              Kho hàng
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
