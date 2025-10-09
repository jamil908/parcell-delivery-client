import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Package, Search, MapPin, Clock, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import { useGetParcelByIdQuery } from '@/redux/api/parcelApi';
import { getStatusColor, getStatusLabel, formatDateTime } from '@/utils/helpers';

interface TrackingFormData {
  trackingId: string;
}


export const Tracking = () => {
   const [searchedId, setSearchedId] = useState<string>('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingFormData>();

  // Only fetch when we have a searched ID and shouldFetch is true
  const { data, isLoading, error } = useGetParcelByIdQuery(searchedId, {
    skip: !shouldFetch || !searchedId,
  });

  const onSubmit = (formData: TrackingFormData) => {
    setSearchedId(formData.trackingId);
    setShouldFetch(true);
  };

  const parcel = data?.data;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case 'picked':
        return <Package className="w-6 h-6 text-blue-600" />;
      case 'in-transit':
        return <Truck className="w-6 h-6 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const statusTimeline = [
    { status: 'pending', label: 'Order Placed' },
    { status: 'picked', label: 'Picked Up' },
    { status: 'in-transit', label: 'In Transit' },
    { status: 'delivered', label: 'Delivered' },
  ];

  const getStatusIndex = (status: string) => {
    return statusTimeline.findIndex(s => s.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ParcelPro</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white hover:text-blue-100 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-5xl font-bold mb-4">Track Your Parcel</h1>
          <p className="text-xl text-blue-100">
            Enter your tracking ID to see real-time updates
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register('trackingId', {
                      required: 'Tracking ID is required',
                      minLength: {
                        value: 3,
                        message: 'Tracking ID must be at least 3 characters',
                      },
                    })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your tracking ID (e.g., TRK001)"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.trackingId && (
                  <p className="text-red-500 text-sm mt-1">{errors.trackingId.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Searching...' : 'Track Parcel'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {shouldFetch && (
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading && (
              <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching for your parcel...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
                <div className="flex items-center space-x-3 text-red-800">
                  <Package className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold">Parcel Not Found</h3>
                    <p className="text-sm">
                      No parcel found with tracking ID: <strong>{searchedId}</strong>
                    </p>
                    <p className="text-sm mt-2">
                      Please check your tracking ID and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {parcel && (
              <div className="space-y-6">
                {/* Parcel Info Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Parcel Details</h2>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(parcel.status)}`}>
                      {getStatusLabel(parcel.status)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Tracking ID</h4>
                      <p className="text-lg font-semibold text-gray-900">{parcel.trackingId || parcel._id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Weight</h4>
                      <p className="text-lg font-semibold text-gray-900">{parcel.weight} kg</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Sender</h4>
                      <p className="text-lg font-semibold text-gray-900">{parcel.senderId?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Receiver</h4>
                      <p className="text-lg font-semibold text-gray-900">{parcel.receiverName}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h4>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                        <p className="text-lg text-gray-900">{parcel.receiverAddress}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Number</h4>
                      <p className="text-lg text-gray-900">{parcel.receiverPhone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Created At</h4>
                      <p className="text-lg text-gray-900">{formatDateTime(parcel.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Delivery Status</h3>
                  
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {statusTimeline.map((step, index) => {
                      const currentIndex = getStatusIndex(parcel.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div key={step.status} className="relative flex items-center mb-8 last:mb-0">
                          {/* Icon */}
                          <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                            isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-white" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="ml-6">
                            <h4 className={`text-lg font-semibold ${
                              isCompleted ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </h4>
                            {isCurrent && (
                              <p className="text-sm text-blue-600 mt-1">
                                Current Status - {formatDateTime(parcel.updatedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Info */}
                {parcel.assignedTo && (
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-gray-900">Delivery Personnel</h4>
                        <p className="text-gray-600">{parcel.assignedTo.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about your parcel, feel free to contact our support team.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 ParcelPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
     );
}
