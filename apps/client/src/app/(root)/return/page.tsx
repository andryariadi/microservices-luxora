import Link from "next/link";
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";

const ReturnPage = async ({ searchParams }: { searchParams: Promise<{ session_id: string }> }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Session Not Found</h1>
          <p className="text-gray-600 mb-6">No session ID provided in the URL.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">Something went wrong while fetching your payment details.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const data = await res.json();
  console.log({ data }, "<--returnPage");

  const getStatusConfig = (status: string, paymentStatus: string) => {
    const statusMap: any = {
      complete: {
        icon: CheckCircle,
        iconColor: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        title: "Payment Successful!",
        description: "Your payment has been processed successfully.",
        buttonColor: "bg-green-600 hover:bg-green-700",
      },
      processing: {
        icon: Clock,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        title: "Payment Processing",
        description: "Your payment is being processed. This may take a few moments.",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      },
      requires_payment_method: {
        icon: XCircle,
        iconColor: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        title: "Payment Failed",
        description: "Your payment could not be processed. Please try again.",
        buttonColor: "bg-red-600 hover:bg-red-700",
      },
      default: {
        icon: Clock,
        iconColor: "text-gray-500",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        title: "Payment Status",
        description: `Status: ${status}`,
        buttonColor: "bg-gray-600 hover:bg-gray-700",
      },
    };

    return statusMap[status] || statusMap.default;
  };

  const statusConfig = getStatusConfig(data.status, data.paymentStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-b p-8 text-center`}>
          <StatusIcon className={`w-20 h-20 mx-auto mb-4 ${statusConfig.iconColor}`} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{statusConfig.title}</h1>
          <p className="text-gray-600 text-lg">{statusConfig.description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Status Badges */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Session Status</p>
              <p className="font-semibold text-green-500 capitalize">{data.status.replace("_", " ")}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <p className="font-semibold text-green-500 capitalize">{data.paymentStatus}</p>
            </div>
          </div>

          {/* Order Details */}
          {data.amount && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-lg text-gray-900">${(data.amount / 100).toFixed(2)}</span>
              </div>
              {data.currency && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Currency:</span>
                  <span className="font-medium">{data.currency.toUpperCase()}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/orders" className={`w-full inline-flex items-center justify-center gap-2 ${statusConfig.buttonColor} text-white px-6 py-4 rounded-lg transition-colors font-medium`}>
              <ExternalLink className="w-5 h-5" />
              View Your Orders
            </Link>
            <Link href="/" className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Continue Shopping
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;
