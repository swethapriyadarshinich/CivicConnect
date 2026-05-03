/**
 * CivicConnect Logger Utility
 * In production, this can be integrated with Google Cloud Logging.
 */
class Logger {
  private static isProduction = process.env.NODE_ENV === 'production';

  static info(message: string, context?: any) {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, context || '');
    }
    // In actual production: 
    // cloudLogging.info({ message, context });
  }

  static warn(message: string, context?: any) {
    console.warn(`[WARN] ${message}`, context || '');
    // In actual production: 
    // cloudLogging.warning({ message, context });
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
    // Critical: Send to error tracking (e.g. Sentry or Cloud Logging Error Reporting)
    // cloudLogging.error({ message, error: error?.message, stack: error?.stack });
  }
}

export default Logger;
