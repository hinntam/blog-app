'use client';

export default function FirebaseConfigChecker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">🔧 Firebase Authentication Error Fix</h1>
          
          <div className="space-y-6">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-200 mb-4">❌ Error: auth/operation-not-allowed</h2>
              <p className="text-gray-300 mb-4">
                This error occurs when the authentication method is not enabled in your Firebase console.
              </p>
            </div>

            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-200 mb-4">✅ Solution: Enable Authentication Methods</h2>
              <div className="space-y-4">
                <div className="text-gray-300">
                  <h3 className="text-white font-semibold mb-2">Step 1: Go to Firebase Console</h3>
                  <a 
                    href="https://console.firebase.google.com/project/authenticationreactapp-b46d6/authentication/providers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    🚀 Open Firebase Authentication Settings
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="text-gray-300">
                  <h3 className="text-white font-semibold mb-2">Step 2: Enable Email/Password</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Click on &quot;Email/Password&quot; provider</li>
                    <li>Toggle &quot;Enable&quot; to ON</li>
                    <li>Click &quot;Save&quot;</li>
                  </ul>
                </div>

                <div className="text-gray-300">
                  <h3 className="text-white font-semibold mb-2">Step 3: Enable Google Sign-In (Optional)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Click on &quot;Google&quot; provider</li>
                    <li>Toggle &quot;Enable&quot; to ON</li>
                    <li>Add your domain (localhost:3000 for development)</li>
                    <li>Click &quot;Save&quot;</li>
                  </ul>
                </div>

                <div className="text-gray-300">
                  <h3 className="text-white font-semibold mb-2">Step 4: Enable GitHub Sign-In (Optional)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Click on &quot;GitHub&quot; provider</li>
                    <li>Toggle &quot;Enable&quot; to ON</li>
                    <li>Add GitHub OAuth App credentials</li>
                    <li>Click &quot;Save&quot;</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-200 mb-4">🎯 Test Your Fix</h2>
              <div className="space-y-3">
                <p className="text-gray-300">After enabling authentication methods:</p>
                <div className="flex space-x-4">
                  <a 
                    href="/login"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    🔐 Try Login Page
                  </a>
                  <a 
                    href="/admin/users"
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    👥 View Users Database
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-200 mb-4">💡 Your Firebase Project Details</h2>
              <div className="text-gray-300 space-y-2">
                <div><strong>Project ID:</strong> authenticationreactapp-b46d6</div>
                <div><strong>Auth Domain:</strong> authenticationreactapp-b46d6.firebaseapp.com</div>
                <div><strong>Status:</strong> Configuration looks correct, just need to enable auth methods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
