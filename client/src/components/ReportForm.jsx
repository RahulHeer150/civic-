import React from 'react'

const ReportForm = () => {
    const [type, setType] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [date, setDate] = React.useState('');
    const [photo, setPhoto] = React.useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

  return (
    <div className='min-h-screen bg-gray-300 p-6 rounded-2xl'>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded mt-10">
            <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Type of Incident</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                    <option value="">Select an option</option>
                    <option value="theft">Theft</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="assault">Assault</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" rows="3"></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Photo (optional)</label>
                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Report</button>
        </form>

    </div>
  )
}

export default ReportForm