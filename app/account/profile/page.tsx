export default function ProfilePage() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Profile</h2>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <button className="bg-black text-white px-4 py-2 rounded">Save</button>
      </form>
    </>
  );
}
