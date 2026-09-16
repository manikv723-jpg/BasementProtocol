// Every business detail a payment-gateway reviewer checks, in one place.
// Values in [square brackets] are placeholders: confirm them before going live.

export const LEGAL_NAME = 'Basement Protocol';
// Business type as registered (sole proprietorship, LLP, private limited company).
export const ENTITY_TYPE = '[entity type]';
export const CONTACT_EMAIL = 'hello@basementprotocol.com';
export const CONTACT_PHONE = '[contact phone]';
export const REGISTERED_ADDRESS = '[registered address]';
export const GRIEVANCE_OFFICER_NAME = '[grievance officer name]';
export const GRIEVANCE_OFFICER_EMAIL = CONTACT_EMAIL;
// Working days within which we reply to support and grievance emails.
export const RESPONSE_DAYS = 2;
export const GOVERNING_LAW = 'India';
export const JURISDICTION_CITY = '[city for courts]';
export const LEGAL_UPDATED = '15 September 2026';

// 4ruple license
export const PRODUCT_NAME = '4ruple.ai';
export const PRICE = 9999;
export const USD_PRICE = 100;
export const CURRENCY = 'INR';
export const PRICE_LABEL = `₹${PRICE.toLocaleString('en-IN')}`;
export const REGIONAL_PRICE_LABEL = `${PRICE_LABEL} in India / US$${USD_PRICE} internationally`;
export const BOOKING_URL = 'https://calendly.com/team-manikai/30min';
export const LICENSE_DEVICES = 1;
export const LICENSE_DEVICE_LABEL = `${LICENSE_DEVICES} device${LICENSE_DEVICES === 1 ? '' : 's'}`;
// Shown under the price. Confirm GST treatment with your accountant.
export const PRICE_TAX_NOTE = '[Inclusive of applicable taxes]';
export const REFUND_WINDOW_DAYS = 7;
// Working days for a refund to reach the original payment method.
export const REFUND_PROCESSING_DAYS = '[5 to 7]';
// Name of the payment gateway, shown in the privacy policy.
export const PAYMENT_PROVIDER = '[payment gateway]';
// Optional external payment link for an explicitly selected alternative provider.
export const CHECKOUT_URL = '';
