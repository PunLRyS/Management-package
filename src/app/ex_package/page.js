import Link from 'next/link';
import ListDLC from './ListDLC';
export default function ExportPackagePage() {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold my-2">Danh sách các đại lý con</h1>
      <div className="w-full flex justify-center my-4">
        <div className="w-3/5 border-t-2 border-blue-700"></div>
      </div>
        <ListDLC />
      </div>
    );
  }