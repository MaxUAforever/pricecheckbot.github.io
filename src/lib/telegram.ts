/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  const urlPattern = new RegExp(
    '^(https?://)?' +                   // optional http:// or https://
    '(www\\.)?' +                        // optional www.
    '([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}' +  // domain
    '(:\\d+)?' +                         // optional port
    '(/.*)?$'                            // optional path
  );
  return urlPattern.test(url);
}

/**
 * Sends a URL to the Telegram bot for processing
 * Returns a promise that resolves with the processed item data
 */
export async function sendUrlToTelegramBot(url: string): Promise<{
  success: boolean;
  data?: {
    name: string;
    photo: string;
    colorVariants: Array<{ color: string; price?: number }>;
  };
  error?: string;
}> {
  // TODO: Replace with actual Telegram Bot API call
  // This is a mock implementation for demonstration
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock API endpoint (replace with actual Telegram bot endpoint)
    // const response = await fetch('YOUR_TELEGRAM_BOT_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url })
    // });
    
    // Mock successful response
    // In production, this would come from your Telegram bot
    const mockSuccess = Math.random() > 0.2; // 80% success rate for demo
    
    if (mockSuccess) {
      return {
        success: true,
        data: {
          name: 'Sample Item',
          photo: url,
          colorVariants: [
            { color: 'Black', price: 99.99 },
            { color: 'White', price: 99.99 },
          ]
        }
      };
    } else {
      return {
        success: false,
        error: 'Failed to process the URL. Please try again.'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    };
  }
}
