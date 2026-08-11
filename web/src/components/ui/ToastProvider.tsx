import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3500,
                style: {
                    background: '#FFFFFF',
                    color: '#2D2B2A',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                    padding: '12px 16px',
                },
                success: {
                    iconTheme: {
                        primary: '#C5A059',
                        secondary: '#FFFFFF',
                    },
                },
            }}
        />
    )
}