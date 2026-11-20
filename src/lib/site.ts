// Single mock-data file — ALL content for Apna Digital Seva Kendra lives here.
// Real client data replaces this file only after the design is approved.
export const site = {
	name: 'Apna Digital Seva Kendra',
	shortName: 'Apna CSC',
	tagline: 'Sab Sarkari Kaam, Ek Hi Dukaan Par',
	description: 'Apna Digital Seva Kendra — CSC & Cyber Cafe in Gaya, Bihar. Aadhaar, PAN, certificates (RTPS), online forms, government schemes, banking, printing and ticket booking — sab sarkari kaam, ek hi dukaan par.',
	url: 'https://apna-csc.pages.dev',
	locale: 'en-IN',
	currency: 'INR',
	owner: 'Rakesh Kumar',
	cscId: 'BR1234567890',
	rating: 4.8,
	reviewCount: 412,
	contact: {
		email: 'care@apnadigitalseva.in',
		phone: '+91 98765 43210',
		phoneHref: '+919876543210',
		whatsapp: '919876543210',
		address: 'Shop No. 12, Main Bazaar Road, Near Bus Stand, Gaya, Bihar 823001',
		city: 'Gaya',
		state: 'Bihar'
	},
	hours: [
		{ days: 'Monday – Saturday', time: '9:00 AM – 8:00 PM' },
		{ days: 'Sunday', time: '10:00 AM – 2:00 PM' }
	],
	disclaimer: 'Apna Digital Seva Kendra is an independent digital assistance centre — it is NOT a government office. Approvals, government fees and processing timelines are decided by the concerned government department. We charge only for our service / assistance; government fees are extra, at actuals.'
};
export const whatsappLink = (message: string) => `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/services' },
	{ label: 'Online Forms', href: '/online-forms' },
	{ label: 'Updates', href: '/updates' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Offers', href: '/offers' },
	{ label: 'Schemes', href: '/schemes' },
	{ label: 'Tools', href: '/tools' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' }
];
export type Category = { slug: string; name: string; hindi: string; icon: string; blurb: string };
export const categories: Category[] = [
	{ slug: 'identity', name: 'Identity Services', hindi: 'Pehchan wale kaam', icon: 'id', blurb: 'Aadhaar, PAN, Voter ID, Passport aur Ration Card — naye, correction aur print.' },
	{ slug: 'certificates', name: 'Certificates (RTPS Bihar)', hindi: 'Praman patra', icon: 'certificate', blurb: 'Aay, Jati, Niwas, Janm-Mrityu praman patra — Bihar RTPS portal se.' },
	{ slug: 'online-forms', name: 'Online Forms', hindi: 'Online form bharna', icon: 'form', blurb: 'Sarkari naukri, exam, admission aur scholarship ke form — sahi aur time par.' },
	{ slug: 'schemes', name: 'Government Schemes', hindi: 'Sarkari yojana', icon: 'landmark', blurb: 'Ayushman, PM-Kisan, e-Shram, Awas, Pension — yojana ka labh yahin se.' },
	{ slug: 'banking', name: 'Banking & Finance', hindi: 'Bank aur paisa', icon: 'bank', blurb: 'AePS, money transfer, khata kholna, bima, ITR aur bill payment.' },
	{ slug: 'travel', name: 'Travel & Tickets', hindi: 'Yatra ticket', icon: 'ticket', blurb: 'Train (IRCTC), bus aur flight ticket — tatkal me bhi madad.' },
	{ slug: 'education', name: 'Education Services', hindi: 'Padhai wale kaam', icon: 'book', blurb: 'Admit card, result, scholarship, OFSS admission aur digital courses.' },
	{ slug: 'print', name: 'Print & Digital', hindi: 'Print aur cyber cafe', icon: 'printer', blurb: 'Print, xerox, scan, photo, PVC card, lamination, resume aur internet.' }
];
export type Service = { slug: string; name: string; hindi: string; category: string; price: number; priceNote: string; duration: string; documents: string[]; description: string; popular?: boolean };
const S = (slug: string, name: string, hindi: string, category: string, price: number, priceNote: string, duration: string, documents: string[], description: string, popular = false): Service => ({ slug, name, hindi, category, price, priceNote, duration, documents, description, popular });
export const services: Service[] = [
	S('aadhaar-update', 'Aadhaar Card Update / Correction', 'Aadhaar sudhaar', 'identity', 100, 'se shuru', '10–15 minute', ['Aadhaar card', 'Mobile number (OTP ke liye)', 'Address proof (address badalna ho to)'], 'Naam, address, date of birth ya mobile number me sudhaar — sahi entry aur print ke saath.', true),
	S('aadhaar-print-pvc', 'Aadhaar Print & PVC Card', 'Aadhaar PVC card', 'identity', 50, 'per card', '5 minute', ['Aadhaar number', 'Registered mobile number'], 'e-Aadhaar download, colour print aur mazboot PVC card — jeb me rakhne layak.'),
	S('pan-new', 'New PAN Card Apply', 'Naya PAN card', 'identity', 250, 'govt fee alag', 'e-PAN turant, physical 7–10 din', ['Aadhaar card', 'Passport photo', 'Signature (white paper par)'], 'NSDL / UTI se naya PAN application — form, photo, signature upload aur status tracking tak poori madad.', true),
	S('pan-correction', 'PAN Card Correction / Reprint', 'PAN sudhaar / dobaara print', 'identity', 200, 'se shuru', '7–10 din', ['Purana PAN card', 'Aadhaar card', 'Sudhaar ka proof'], 'PAN me naam, DOB ya father name ka correction, khoya hua PAN reprint aur PAN-Aadhaar link.'),
	S('voter-id', 'Voter ID — New / Correction', 'Matdata pehchan patra', 'identity', 80, 'se shuru', '15–30 din (ECI par nirbhar)', ['Aadhaar card', 'Address proof', 'Passport photo'], 'Naya voter registration (Form 6), correction, duplicate EPIC aur e-EPIC download/print.', true),
	S('passport-apply', 'Passport Application Help', 'Passport form', 'identity', 300, 'govt fee alag', 'Form 20 minute, appointment slot par', ['Aadhaar card', 'PAN card', 'Birth certificate / 10th marksheet', 'Address proof'], 'Passport Seva par online form, fee payment aur appointment booking — documents checklist ke saath.'),
	S('ration-card', 'Ration Card — New / Sudhaar', 'Ration card seva', 'identity', 150, 'se shuru', 'Form 20 minute', ['Aadhaar (sab sadasya)', 'Parivar ke photo', 'Bank passbook'], 'Bihar ration card me naya naam jodna, sudhaar aur naya ration card ka online aavedan.'),
	S('driving-licence', 'Driving Licence Services', 'Driving licence', 'identity', 250, 'govt fee alag', 'Form 20 minute', ['Aadhaar card', 'Address proof', 'Photo aur signature'], 'Learner licence, permanent DL renewal aur duplicate licence ke liye Parivahan portal par aavedan.'),
	S('income-certificate', 'Income Certificate (Aay Praman Patra)', 'Aay praman patra', 'certificates', 100, 'se shuru', 'RTPS par 10 din', ['Aadhaar card', 'Ration card', 'Aay ka swaghoshna patra'], 'Bihar RTPS se aay praman patra — scholarship, EWS aur yojanaon ke liye sabse zyada manga jaane wala dastavej.', true),
	S('caste-certificate', 'Caste Certificate (Jati Praman Patra)', 'Jati praman patra', 'certificates', 100, 'se shuru', 'RTPS par 10 din', ['Aadhaar card', 'Pita ka jati praman patra (ho to)', 'Ration card'], 'SC / ST / OBC / EBC ke liye Bihar RTPS jati praman patra ka sahi aavedan aur status check.', true),
	S('residence-certificate', 'Residence Certificate (Niwas Praman Patra)', 'Niwas praman patra', 'certificates', 100, 'se shuru', 'RTPS par 10 din', ['Aadhaar card', 'Voter ID / ration card', 'Zameen / ghar ke kagaz (ho to)'], 'Sthaniya niwas praman patra — naukri, admission aur yojana ke liye.', true),
	S('birth-death-certificate', 'Birth / Death Certificate', 'Janm / mrityu praman patra', 'certificates', 120, 'se shuru', '7–21 din', ['Hospital discharge / janm suchna', 'Aadhaar (mata-pita)', 'Ration card'], 'Janm aur mrityu praman patra ka registration aur purane certificate ki certified copy.'),
	S('character-certificate', 'Character Certificate', 'Charitra praman patra', 'certificates', 100, 'se shuru', 'RTPS par 10 din', ['Aadhaar card', 'Photo'], 'Naukri aur admission ke liye charitra praman patra ka aavedan.'),
	S('govt-job-form', 'Government Job Form Filling', 'Sarkari naukri form', 'online-forms', 100, 'per form, se shuru', '15–30 minute', ['Photo aur signature', 'Sab marksheet / certificate', 'Aadhaar card', 'Category certificate (ho to)'], 'SSC, UPSC, BPSC, Railway, Banking, Police, Army Agniveer — har form photo/signature resize ke saath galti-mukt.', true),
	S('exam-form', 'Exam Form Filling', 'Pariksha form', 'online-forms', 80, 'per form, se shuru', '15 minute', ['Previous marksheet', 'Aadhaar card', 'Photo'], 'Board, university aur entrance exam (JEE, NEET, BSEB) ke form — last date se pehle, sahi category ke saath.'),
	S('admission-form', 'College Admission Form (OFSS / UG / PG)', 'Admission form', 'online-forms', 100, 'per form, se shuru', '20 minute', ['10th / 12th marksheet', 'Aadhaar card', 'Photo', 'Caste / income certificate (ho to)'], 'Bihar OFSS Inter admission, UG/PG admission aur ITI / Polytechnic ke form — college preference soch-samajh kar.', true),
	S('scholarship-form', 'Scholarship Form Filling', 'Chhatravritti form', 'online-forms', 100, 'per form, se shuru', '20 minute', ['Pichli class ki marksheet', 'Income / caste / residence certificate', 'Bank passbook', 'Bonafide certificate'], 'NSP, Bihar Post-Matric Scholarship aur rajya ki sabhi chhatravrittiyon ke form — institute verification me bhi madad.'),
	S('otr-registration', 'One-Time Registration (OTR)', 'OTR registration', 'online-forms', 60, 'per registration', '10 minute', ['Aadhaar card', '10th marksheet', 'Mobile aur email'], 'SSC, BPSC aur anya portalon par OTR / profile registration taaki har form jaldi bhare.'),
	S('ayushman-card', 'Ayushman Card (PM-JAY)', 'Ayushman golden card', 'schemes', 80, 'se shuru', 'Card 15 minute me', ['Aadhaar (sab sadasya)', 'Ration card', 'Mobile number'], 'PM-JAY ke tahat ₹5 lakh tak muft ilaaj wala Ayushman card — eligibility check, e-KYC aur PVC card print.', true),
	S('pm-kisan', 'PM-Kisan — Apply / e-KYC / Status', 'PM-Kisan seva', 'schemes', 60, 'se shuru', '10 minute', ['Aadhaar card', 'Bank passbook', 'Zameen ke kagaz (khata-khesra)'], 'Naya PM-Kisan registration, e-KYC, kist ka status aur beneficiary sudhaar.'),
	S('e-shram', 'e-Shram Card Registration', 'e-Shram card', 'schemes', 60, 'se shuru', '10 minute', ['Aadhaar-linked mobile', 'Bank passbook', 'Nominee ki jaankari'], 'Asangathit mazdooron ke liye e-Shram card — bima aur yojanaon ka labh ek card se.'),
	S('pm-awas', 'PM Awas Yojana — Apply / List Check', 'Awas yojana', 'schemes', 80, 'se shuru', '20 minute', ['Aadhaar card', 'Ration card', 'Bank passbook', 'Job card (ho to)'], 'PM Awas (Gramin / Shahri) ka aavedan, naam list me check aur kist ka status.'),
	S('pension-schemes', 'Pension Schemes — PMJJBY / PMSBY / APY', 'Pension aur bima yojana', 'schemes', 50, 'se shuru', '10 minute', ['Aadhaar card', 'Bank passbook'], '₹2 lakh bima (PMJJBY/PMSBY) aur Atal Pension Yojana me naamankan aur premium jaankari.'),
	S('kisan-credit-card', 'Kisan Credit Card (KCC)', 'Kisan credit card', 'schemes', 100, 'se shuru', 'Form 20 minute', ['Aadhaar card', 'Zameen ke kagaz', 'Bank passbook', 'Photo'], 'Kheti ke liye KCC loan form aur bank me jama karne layak poora document set.'),
	S('pm-fasal-bima', 'PM Fasal Bima (PMFBY) — Crop Insurance', 'Fasal bima yojana', 'schemes', 80, 'se shuru', 'Form 20 minute', ['Aadhaar card', 'Bank passbook', 'Zameen ke kagaz (khata-khesra)', 'Fasal / bigha ki jaankari'], 'Fasal kharab hone par PMFBY ke tahat bima daava — season se pehle registration, premium hisaab aur claim me madad.', true),
	S('bhulekh-land-records', 'Bhulekh — Zameen Ke Kagaz (Khatiyan)', 'Bhulekh / zameen record', 'certificates', 50, 'per print, se shuru', '10 minute', ['Khata / khesra number', 'Aadhaar card', 'Zameen malik ka naam'], 'Bihar Bhulekh se khatiyan, jamabandi aur zameen record ki print — PM-Kisan, KCC aur registry ke kaam ke liye.'),
	S('udyam-registration', 'Udyam (MSME) Registration', 'Udyam registration', 'schemes', 150, 'se shuru', '15 minute', ['Aadhaar card', 'PAN card', 'Bank account details'], 'Dukaan / chhote business ke liye Udyam registration — loan aur yojanaon ke liye zaroori.'),
	S('aeps', 'AePS — Cash Withdrawal / Deposit / Balance', 'Aadhaar se paisa', 'banking', 0, 'bank niyam anusar', 'Turant', ['Aadhaar card', 'Bank khata Aadhaar se link', 'Fingerprint (biometric)'], 'Aadhaar aur ungli ke nishan se paisa nikalna, jama karna, balance aur mini statement — bank jaane ki zaroorat nahi.', true),
	S('money-transfer', 'Money Transfer (DMT)', 'Paisa bhejna', 'banking', 0, 'amount par nirbhar', 'Turant', ['Receiver ka account number aur IFSC', 'Sender ka mobile number'], 'Desh ke kisi bhi bank khate me turant paisa bhejna — receipt ke saath, cash bhi swikar.'),
	S('jan-dhan-account', 'Jan Dhan / Bank Account Opening', 'Khata kholna', 'banking', 0, 'bank niyam anusar', 'Form 15 minute', ['Aadhaar card', 'PAN card', '2 photo'], 'Jan Dhan aur savings khata khulwane ke form aur KYC documents ki poori taiyaari.'),
	S('insurance', 'Insurance — Life / Health / Vehicle', 'Bima seva', 'banking', 0, 'premium par nirbhar', '15 minute', ['Aadhaar card', 'Policy / vehicle documents'], 'Life, health, motor aur fasal bima — nayi policy, renewal aur premium bhugtan.'),
	S('itr-filing', 'ITR Filing Help', 'Income tax return', 'banking', 500, 'se shuru', '1–2 din', ['PAN card', 'Aadhaar card', 'Form 16 / salary slip', 'Bank statement'], 'Salary, pension aur chhote vyapariyon ke liye ITR filing me poori sahayata — refund status ke saath.'),
	S('bill-payment', 'Bill Payment (BBPS)', 'Bill bhugtan', 'banking', 10, 'per bill, se shuru', 'Turant', ['Purana bill / consumer number', 'Mobile number'], 'Bijli, paani, gas, broadband, DTH — Bharat BillPay se sab bill ek jagah, receipt ke saath.'),
	S('recharge-fastag', 'Recharge & FASTag', 'Recharge seva', 'banking', 10, 'se shuru', 'Turant', ['Mobile / DTH number', 'Vehicle number (FASTag ke liye)'], 'Mobile recharge, DTH recharge aur FASTag recharge / naya tag.'),
	S('train-ticket', 'Train Ticket Booking (IRCTC)', 'Rail ticket', 'travel', 50, 'per ticket, se shuru', '5–10 minute', ['Yatriyon ke naam aur umar', 'Aadhaar / ID proof', 'Journey date'], 'General, tatkal aur waiting list ticket — PNR status aur chart ki jaankari ke saath.', true),
	S('bus-ticket', 'Bus Ticket Booking', 'Bus ticket', 'travel', 30, 'per ticket, se shuru', '5 minute', ['Yatri ka naam', 'Mobile number'], 'Rajya aur private buson ke online ticket — seat pasand ke saath.'),
	S('flight-ticket', 'Flight Ticket Booking', 'Hawai ticket', 'travel', 150, 'per ticket, se shuru', '10 minute', ['ID proof (Aadhaar / Passport)', 'Yatri ka naam (ID jaisa hi)'], 'Sasti domestic flight ticket, web check-in aur boarding pass print.'),
	S('admit-card', 'Admit Card Download & Print', 'Admit card print', 'education', 30, 'per print', '5 minute', ['Application / registration number', 'Date of birth'], 'Har exam ka admit card download aur saaf print — exam centre ke niyam ke saath.'),
	S('result-check', 'Result Check & Marksheet Print', 'Result print', 'education', 30, 'per print', '5 minute', ['Roll number', 'Registration number'], 'Board, university aur bharti pariksha ke result — marksheet print aur PDF mobile par bhi.'),
	S('computer-course', 'Computer Course Admission (DCA / ADCA)', 'Computer course', 'education', 1000, 'course fee se shuru', 'Admission 15 minute', ['10th marksheet', 'Aadhaar card', '2 photo'], 'DCA / ADCA aur typing course me admission — certificate ke saath, naukri form me kaam aane wala.'),
	S('printing-xerox', 'Printing & Photocopy (Xerox)', 'Print aur xerox', 'print', 3, 'per page (B/W)', 'Turant', ['Document / PDF (mobile, pen drive ya email se)'], 'B/W print ₹3/page, colour ₹10/page, xerox, bulk print par discount — WhatsApp se bhejo, aakar le jao.'),
	S('scan-pdf', 'Scan & PDF Services', 'Scan aur PDF banana', 'print', 10, 'per page', 'Turant', ['Original documents'], 'High-quality scan, PDF merge/compress, photo-signature resize — form ke size limit ke hisaab se bilkul sahi.'),
	S('passport-photo', 'Passport Size Photo', 'Passport photo', 'print', 50, '6 copy', '5 minute', ['Dukaan par photo khinchti hai — kuch lane ki zaroorat nahi'], 'Turant passport photo — form ke background aur size niyam ke hisaab se, soft copy mobile par bhi.'),
	S('pvc-card', 'PVC Card Printing', 'PVC card print', 'print', 50, 'per card', '5 minute', ['Card ki PDF / number', 'Mobile OTP (zaroorat par)'], 'Aadhaar, PAN, Voter, Ayushman — sab card mazboot PVC par, paani se kharab nahi hone wale.'),
	S('lamination-binding', 'Lamination & Spiral Binding', 'Lamination binding', 'print', 20, 'per item, se shuru', '10 minute', ['Document / project file'], 'Certificate lamination, project aur report ki spiral binding — saaf aur mazboot finish.'),
	S('resume-typing', 'Resume (CV) & Typing', 'Resume aur typing', 'print', 100, 'per resume, se shuru', '30 minute', ['Purana resume / details', 'Photo'], 'Naukri ke liye professional resume, Hindi/English typing, application aur biodata taiyaar.'),
	S('internet-browsing', 'Internet Browsing & Email', 'Internet seva', 'print', 30, 'per ghanta', 'Turant', ['ID proof (pehli baar)'], 'Tez internet, email banana/bhejna, online class aur meeting ke liye shant jagah aur computer.')
];
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
export const popularServices = services.filter((s) => s.popular);
export const stats = [
	{ value: '25,000+', label: 'Forms aur kaam pure hue' },
	{ value: '40+', label: 'Services ek hi chhat ke neeche' },
	{ value: '4.8/5', label: 'Customer rating (412 reviews)' },
	{ value: '9 saal', label: 'Gaya me seva ka tajurba' }
];
export const steps = [
	{ title: 'Dukaan par aao ya WhatsApp karo', text: 'Kaam batao — hum documents ki list aur total kharcha pehle hi saaf bata denge.' },
	{ title: 'Documents do, form hum bharenge', text: 'Photo, signature, scan — sab yahin taiyaar. Form submit se pehle aapko dikha kar check karayenge.' },
	{ title: 'Receipt aur status pao', text: 'Har kaam ki pakki receipt milegi. Status kabhi bhi phone par pooch sakte ho.' }
];

export type SchemeFinder = { occupations: string[]; minAge?: number; maxAge?: number; maxIncome?: number };
export type Scheme = { slug: string; name: string; benefit: string; eligibility: string; documents: string[]; serviceSlug: string; finder?: SchemeFinder };
export const schemes: Scheme[] = [
	{ slug: 'pm-jay', name: 'Ayushman Bharat (PM-JAY)', benefit: 'Har parivar ko ₹5 lakh / saal tak muft ilaaj (listed hospital me)', eligibility: 'SECC list me naam / ration card wala patr parivar', documents: ['Aadhaar (sab sadasya)', 'Ration card'], serviceSlug: 'ayushman-card' },
	{ slug: 'pm-kisan', name: 'PM-Kisan Samman Nidhi', benefit: '₹6,000 / saal, 3 kiston me seedha bank khate me', eligibility: 'Zameen wale kisan parivar', documents: ['Aadhaar', 'Bank passbook', 'Khata-khesra'], serviceSlug: 'pm-kisan' },
	{ slug: 'e-shram', name: 'e-Shram Yojana', benefit: 'e-Shram card + ₹2 lakh tak durghatna bima cover', eligibility: '16–59 saal ke asangathit mazdoor / kaamgar', documents: ['Aadhaar-linked mobile', 'Bank passbook'], serviceSlug: 'e-shram' },
	{ slug: 'pm-awas', name: 'PM Awas Yojana', benefit: 'Pakka ghar banane ke liye ₹1.20 lakh tak sahayata (Gramin)', eligibility: 'Kachcha / bina ghar wala patr parivar', documents: ['Aadhaar', 'Ration card', 'Bank passbook', 'Job card'], serviceSlug: 'pm-awas' },
	{ slug: 'pmjjby', name: 'PM Jeevan Jyoti Bima (PMJJBY)', benefit: '₹2 lakh life bima, premium ₹436 / saal', eligibility: '18–50 saal, bank khata wala koi bhi', documents: ['Aadhaar', 'Bank passbook'], serviceSlug: 'pension-schemes' },
	{ slug: 'pmsby', name: 'PM Suraksha Bima (PMSBY)', benefit: '₹2 lakh durghatna bima, premium sirf ₹20 / saal', eligibility: '18–70 saal, bank khata wala koi bhi', documents: ['Aadhaar', 'Bank passbook'], serviceSlug: 'pension-schemes' },
	{ slug: 'apy', name: 'Atal Pension Yojana (APY)', benefit: '60 saal ke baad ₹1,000–₹5,000 / mahina pakki pension', eligibility: '18–40 saal, bank khata wala', documents: ['Aadhaar', 'Bank passbook', 'Mobile number'], serviceSlug: 'pension-schemes' },
	{ slug: 'kcc', name: 'Kisan Credit Card (KCC)', benefit: 'Kheti ke liye ₹3 lakh tak sasta byaj par loan', eligibility: 'Kisan, FPO aur pashu-palan / matsya palak', documents: ['Aadhaar', 'Zameen ke kagaz', 'Bank passbook'], serviceSlug: 'kisan-credit-card' },
	{ slug: 'pmfby', name: 'PM Fasal Bima Yojana (PMFBY)', benefit: 'Fasal barbaad hone par bima daava — premium ka bada hissa sarkar bharti hai', eligibility: 'Fasal ugaane wale sab kisan (bataidaar bhi)', documents: ['Aadhaar', 'Bank passbook', 'Khata-khesra', 'Fasal jaankari'], serviceSlug: 'pm-fasal-bima' }
];

export type UpdateItem = { slug: string; type: 'Job' | 'Admit Card' | 'Result' | 'Answer Key'; title: string; org: string; posts?: string; startDate: string; lastDate: string; examDate?: string; fee: string; eligibility: string; documents: string[]; summary: string; officialLink?: string };
export const updates: UpdateItem[] = [
	{ slug: 'ssc-gd-constable-2027', type: 'Job', title: 'SSC GD Constable Recruitment 2027', org: 'Staff Selection Commission', posts: '25,487 posts (mock)', startDate: '01 Dec 2026', lastDate: '31 Dec 2026', examDate: 'Feb–Mar 2027 (expected)', fee: '₹100 (Gen/OBC) · Mahila/SC/ST: muft', eligibility: '10th pass, umar 18–23 saal', documents: ['10th marksheet', 'Aadhaar', 'Photo-signature', 'Caste certificate (ho to)'], summary: 'CAPF, BSF, CISF, CRPF, SSB aur Rifleman GD ke liye badi bharti. OTR pehle se hona zaroori hai — dukaan par OTR + form dono ho jayega.' },
	{ slug: 'bihar-police-constable-2027', type: 'Job', title: 'Bihar Police Constable Bharti 2027', org: 'CSBC Bihar', posts: '19,838 posts (mock)', startDate: '05 Dec 2026', lastDate: '05 Jan 2027', fee: '₹675 (Gen/OBC/EWS) · SC/ST: ₹180', eligibility: '12th pass, umar 18–25 saal', documents: ['12th marksheet', 'Aadhaar', 'Caste/residence certificate', 'Photo'], summary: 'Bihar Police constable ki pratikshit bharti. Physical ki taiyaari ke saath form me galti bilkul na ho — yahin se sahi form bharwayein.' },
	{ slug: 'rrb-ntpc-graduate-2027', type: 'Job', title: 'Railway RRB NTPC (Graduate) 2027', org: 'Railway Recruitment Board', posts: '11,558 posts (mock)', startDate: '10 Dec 2026', lastDate: '09 Jan 2027', examDate: 'Apr 2027 (expected)', fee: '₹500 (Gen/OBC) · SC/ST/Mahila: ₹250', eligibility: 'Graduate, umar 18–33 saal', documents: ['Graduation marksheet', 'Aadhaar', 'Photo-signature', 'Caste certificate (ho to)'], summary: 'Station Master, Goods Guard, Sr. Clerk aur CA posts. Railway form me photo/signature ke niyam sakht hain — scan yahin sahi size me hoga.' },
	{ slug: 'bseb-inter-exam-2027-admit-card', type: 'Admit Card', title: 'BSEB Inter Exam 2027 — Admit Card', org: 'Bihar School Examination Board', startDate: '12 Jan 2027', lastDate: '31 Jan 2027', examDate: '01 Feb 2027 se', fee: 'Print ₹30', eligibility: 'BSEB Inter 2027 ke panjikrit chhatra', documents: ['Registration number', 'Date of birth'], summary: 'Bihar Board Inter pariksha ka admit card jaari. School se sign-mohar wala original admit card hi manya hai — print aur lamination yahin ho jayega.' },
	{ slug: 'ssc-cgl-2026-admit-card', type: 'Admit Card', title: 'SSC CGL 2026 Tier-1 Admit Card', org: 'Staff Selection Commission', startDate: '18 Dec 2026', lastDate: '28 Dec 2026', examDate: 'Jan 2027', fee: 'Print ₹30', eligibility: 'SSC CGL 2026 ke aavedak', documents: ['Registration number', 'Date of birth'], summary: 'SSC CGL Tier-1 ka admit card aur exam city intimation jaari. Print ke saath ID proof ki copy bhi taiyaar rakh dein.' },
	{ slug: 'bseb-matric-result-2027', type: 'Result', title: 'BSEB Matric Result 2027', org: 'Bihar School Examination Board', startDate: '28 Mar 2027 (expected)', lastDate: '—', fee: 'Print ₹30', eligibility: 'BSEB Matric 2027 ke chhatra', documents: ['Roll code + roll number'], summary: 'Bihar Board 10th result ghoshit hote hi dukaan par result + marksheet print milega. Scrutiny aur compartment form me bhi madad milegi.' },
	{ slug: 'ibps-po-2026-result', type: 'Result', title: 'IBPS PO 2026 — Final Result', org: 'Institute of Banking Personnel Selection', startDate: '01 Jan 2027', lastDate: '31 Jan 2027', fee: 'Print ₹30', eligibility: 'IBPS PO 2026 interview wale ummeedwar', documents: ['Registration number', 'Password / DOB'], summary: 'Bank PO final result aur allotment jaari. Scorecard print aur aage ke document verification ki checklist yahin milegi.' },
	{ slug: 'ctet-feb-2027', type: 'Job', title: 'CTET February 2027 — Online Form', org: 'CBSE', startDate: '20 Dec 2026', lastDate: '20 Jan 2027', examDate: '08 Feb 2027', fee: '₹1,000 (ek paper, Gen/OBC) · SC/ST: ₹500', eligibility: '12th + D.El.Ed ya Graduation + B.Ed', documents: ['Marksheet (12th/Graduation)', 'Aadhaar', 'Photo-signature'], summary: 'Shikshak banne ke liye CTET form. Paper 1 / Paper 2 ka sahi chayan aur category — form bharne se pehle salah muft hai.' },
	{ slug: 'upsc-nda-2027-answer-key', type: 'Answer Key', title: 'UPSC NDA 2027 — Answer Key', org: 'Union Public Service Commission', startDate: '15 Jan 2027', lastDate: '15 Feb 2027', fee: 'Print ₹30', eligibility: 'NDA 2027 ke ummeedwar', documents: ['Roll number'], summary: 'NDA ki aadhikarik answer key jaari. Apne marks ka hisaab aur objection dalne me madad ke liye dukaan par aayein.' }
];
export const getUpdate = (slug: string) => updates.find((u) => u.slug === slug);

export type PriceItem = { name: string; category: string; price: number; unit: string; note?: string };
export const priceList: PriceItem[] = [
	{ name: 'B/W Print / Xerox', category: 'Print & Digital', price: 3, unit: 'per page' },
	{ name: 'Colour Print', category: 'Print & Digital', price: 10, unit: 'per page' },
	{ name: 'Scan (PDF)', category: 'Print & Digital', price: 10, unit: 'per page' },
	{ name: 'Passport Photo (6 copy)', category: 'Print & Digital', price: 50, unit: 'per set' },
	{ name: 'PVC Card Print', category: 'Print & Digital', price: 50, unit: 'per card' },
	{ name: 'Lamination (A4)', category: 'Print & Digital', price: 30, unit: 'per page' },
	{ name: 'Spiral Binding', category: 'Print & Digital', price: 40, unit: 'se shuru' },
	{ name: 'Resume (CV) Banana', category: 'Print & Digital', price: 100, unit: 'per resume' },
	{ name: 'Internet Browsing', category: 'Print & Digital', price: 30, unit: 'per ghanta' },
	{ name: 'Aadhaar Update / Correction', category: 'Identity', price: 100, unit: 'se shuru', note: 'Govt fee alag ho sakti hai' },
	{ name: 'Aadhaar PVC Card', category: 'Identity', price: 50, unit: 'per card' },
	{ name: 'New PAN Card', category: 'Identity', price: 250, unit: 'per application', note: 'Govt fee alag' },
	{ name: 'PAN Correction / Reprint', category: 'Identity', price: 200, unit: 'se shuru' },
	{ name: 'Voter ID New / Correction', category: 'Identity', price: 80, unit: 'se shuru' },
	{ name: 'Passport Form Help', category: 'Identity', price: 300, unit: 'per application', note: 'Govt fee alag' },
	{ name: 'Income / Caste / Residence Certificate (RTPS)', category: 'Certificates', price: 100, unit: 'per certificate' },
	{ name: 'Birth / Death Certificate', category: 'Certificates', price: 120, unit: 'se shuru' },
	{ name: 'Sarkari Naukri Form', category: 'Online Forms', price: 100, unit: 'per form, se shuru', note: 'Exam fee alag, actual par' },
	{ name: 'Admission / Scholarship Form', category: 'Online Forms', price: 100, unit: 'per form, se shuru' },
	{ name: 'OTR Registration', category: 'Online Forms', price: 60, unit: 'per registration' },
	{ name: 'Ayushman Card', category: 'Schemes', price: 80, unit: 'se shuru' },
	{ name: 'PM-Kisan e-KYC / Status', category: 'Schemes', price: 60, unit: 'se shuru' },
	{ name: 'e-Shram Card', category: 'Schemes', price: 60, unit: 'per card' },
	{ name: 'Udyam Registration', category: 'Schemes', price: 150, unit: 'per registration' },
	{ name: 'Train Ticket Booking', category: 'Travel', price: 50, unit: 'per ticket, se shuru', note: 'Ticket kiraya alag' },
	{ name: 'Bus / Flight Ticket', category: 'Travel', price: 30, unit: 'per ticket, se shuru', note: 'Kiraya alag' },
	{ name: 'Admit Card / Result Print', category: 'Education', price: 30, unit: 'per print' },
	{ name: 'ITR Filing Help', category: 'Banking', price: 500, unit: 'se shuru' },
	{ name: 'Bill Payment (BBPS)', category: 'Banking', price: 10, unit: 'per bill, se shuru', note: 'Bill amount actual par' }
];

export const testimonials = [
	{ quote: 'Mera PAN card 8 din me ghar aa gaya. Form bharne se pehle saara kharcha saaf bata diya tha — koi chhupa charge nahi.', author: 'Sunita Devi', role: 'PAN Card · Bodh Gaya', rating: 5 },
	{ quote: 'Beti ka scholarship form yahin se bhara, paisa seedha khate me aaya. Documents ki list pehle din hi mil gayi thi.', author: 'Mohd. Salim', role: 'Post-Matric Scholarship · Gaya', rating: 5 },
	{ quote: 'Railway ka form photo ki wajah se do baar reject hua tha. Yahan sahi scan ke saath bhara aur pehli baar me accept ho gaya.', author: 'Amit Kumar', role: 'RRB NTPC Form · Wazirganj', rating: 5 },
	{ quote: 'Buzurg pita ji ka Ayushman card 15 minute me ban gaya. Ab ilaaj ki chinta khatm.', author: 'Ramesh Prasad', role: 'Ayushman Card · Gaya', rating: 5 },
	{ quote: 'Maa ka pension aur Aadhaar correction ek hi din ho gaya. Staff bahut hi shanti se samjhata hai.', author: 'Priya Kumari', role: 'Aadhaar + Pension · Manpur', rating: 4 },
	{ quote: 'Print, xerox aur form — college ka saara kaam ek hi dukaan par ho jaata hai. Rate board par sab saaf likha hai.', author: 'Vikash Yadav', role: 'Student · Gaya College', rating: 5 }
];

export const faqs = [
	{ q: 'Kya ye sarkari daftar (government office) hai?', a: 'Nahi. Apna Digital Seva Kendra ek independent digital assistance centre (CSC / Cyber Cafe) hai, sarkari daftar nahi. Hum aapka form sahi tarike se sarkari portal par bharne me madad karte hain. Approval, sarkari fee aur samay seema hamesha sambandhit sarkari vibhag tay karta hai.' },
	{ q: 'Total kharcha kitna aayega? Chhupe charge to nahi?', a: 'Har kaam ki service fees dukaan ke rate board aur is website ke Pricing page par saaf likhi hai. Sarkari / exam fee iske alawa actual par lagti hai, jiski receipt aapko milti hai. Kaam shuru hone se pehle total bata diya jaata hai.' },
	{ q: 'Form bharne ke liye kya-kya documents lane hain?', a: 'Har service ke page par Documents Required ki list di hai. Aam taur par Aadhaar card, photo, mobile number aur kaam se sambandhit marksheet/certificate chahiye. Asli documents scan ke baad turant wapas mil jaate hain.' },
	{ q: 'Mera form galat bhar gaya tha, sudhaar ho sakta hai?', a: 'Zyadaatar portalon par correction window khulti hai. Apni receipt lekar aayein — hum status check karke sudhaar ki sahi prakriya batayenge aur form theek karne me madad karenge.' },
	{ q: 'PAN card / certificate kitne din me milega?', a: 'e-PAN turant mil jaata hai, physical PAN 7–10 din me post se aata hai. RTPS certificate aam taur par 10 din me jaari hote hain. Ye samay sarkari vibhag par nirbhar karta hai — hum aapko status har samay check karke batate rahenge.' },
	{ q: 'Kya main WhatsApp par documents bhej sakta hu?', a: 'Haan. Print, xerox aur kai form ke documents aap WhatsApp par bhej sakte hain — dukaan par aakar sirf le jana hoga. Lekin biometric wale kaam (AePS, Aadhaar e-KYC) ke liye khud aana zaroori hai.' },
	{ q: 'Paisa nikalna (AePS) surakshit hai?', a: 'AePS me paisa sirf aapke fingerprint varification ke baad nikalta hai aur har transaction ki pakki receipt milti hai. Apna OTP ya PIN kabhi kisi ke saath share na karein — hum kabhi nahi maangte.' },
	{ q: 'Dukaan kitne baje khulti hai?', a: 'Somvaar se Shanivaar subah 9 baje se raat 8 baje tak, aur Ravivaar subah 10 baje se dopahar 2 baje tak. Tatkal ticket ya last-date wale form ke liye pehle phone kar lein.' }
];

export const images = {
	hero: { stem: '/images/shop-front', alt: 'Apna Digital Seva Kendra — Gaya me CSC aur cyber cafe ki dukaan ka saamne ka drishya' },
	shopFront: { stem: '/images/shop-front', alt: 'Dukaan ka front — CSC board ke saath graahak aate hue' },
	counter: { stem: '/images/counter-help', alt: 'Counter par staff graahak ke Aadhaar aur PAN documents me madad karte hue' },
	printing: { stem: '/images/printing-area', alt: 'Dukaan ka printing aur photocopy area — printer aur kagaz ke saath' },
	browsing: { stem: '/images/browsing-area', alt: 'Cyber cafe ka computer area — chhatra online form bharte hue' },
	passportPhoto: { stem: '/images/passport-photo', alt: 'Passport size photo ka setup — camera aur safed parda' },
	banking: { stem: '/images/banking-counter', alt: 'AePS banking counter — fingerprint device se paisa nikalta graahak' },
	examHelp: { stem: '/images/exam-help', alt: 'Staff chhatron ko sarkari exam aur scholarship form bharne me madad karte hue' },
	happy: { stem: '/images/happy-customer', alt: 'Khush graahak parivar dukaan se print documents aur PVC card lete hue' }
};
export const galleryItems = [
	{ ...images.shopFront, category: 'Dukaan', label: 'Hamari Dukaan — Main Bazaar Road' },
	{ ...images.counter, category: 'Dukaan', label: 'Seva Counter' },
	{ ...images.printing, category: 'Print', label: 'Printing aur Photocopy' },
	{ ...images.passportPhoto, category: 'Print', label: 'Passport Photo Setup' },
	{ ...images.browsing, category: 'Computer', label: 'Computer / Internet Area' },
	{ ...images.examHelp, category: 'Computer', label: 'Form Bharne Me Madad' },
	{ ...images.banking, category: 'Banking', label: 'AePS Banking Counter' },
	{ ...images.happy, category: 'Dukaan', label: 'Khush Graahak' }
];

export const portals = [
	{ name: 'UIDAI (Aadhaar)', href: 'https://uidai.gov.in' },
	{ name: 'PAN — Protean (NSDL)', href: 'https://www.protean-tinpan.com' },
	{ name: 'PAN — UTIITSL', href: 'https://www.utiitsl.com' },
	{ name: 'Passport Seva', href: 'https://www.passportindia.gov.in' },
	{ name: 'IRCTC (Railway)', href: 'https://www.irctc.co.in' },
	{ name: 'National Scholarship Portal', href: 'https://scholarships.gov.in' },
	{ name: 'RTPS Bihar', href: 'https://serviceonline.bihar.gov.in' },
	{ name: 'CSC — Digital Seva', href: 'https://digitalseva.csc.gov.in' }
];

export const footer = {
	note: 'Mock website — sab naam, number aur daam design approval ke liye hain. Asli client data milne par ek hi file (site.ts) se badal jayega.',
	copyright: '© 2026 Apna Digital Seva Kendra, Gaya (Bihar). All rights reserved.'
};

// ---- Upgrade additions (mock data, same single-file rule) ----

// Official portal link per update (real official domains only).
const updateOfficialLinks: Record<string, string> = {
	'ssc-gd-constable-2027': 'https://ssc.gov.in',
	'bihar-police-constable-2027': 'https://csbc.bihar.gov.in',
	'rrb-ntpc-graduate-2027': 'https://www.rrbcdg.gov.in',
	'bseb-inter-exam-2027-admit-card': 'https://biharboardonline.com',
	'ssc-cgl-2026-admit-card': 'https://ssc.gov.in',
	'bseb-matric-result-2027': 'https://biharboardonline.com',
	'ibps-po-2026-result': 'https://www.ibps.in',
	'ctet-feb-2027': 'https://ctet.nic.in',
	'upsc-nda-2027-answer-key': 'https://upsc.gov.in'
};
for (const u of updates) u.officialLink = updateOfficialLinks[u.slug];

// Scheme-finder rules (mock eligibility logic for /schemes finder).
const schemeFinderRules: Record<string, SchemeFinder> = {
	'pm-jay': { occupations: ['farmer', 'worker', 'woman', 'senior', 'other'], maxIncome: 250000 },
	'pm-kisan': { occupations: ['farmer'], minAge: 18 },
	'e-shram': { occupations: ['worker'], minAge: 16, maxAge: 59 },
	'pm-awas': { occupations: ['farmer', 'worker', 'woman', 'other'], maxIncome: 300000 },
	'pmjjby': { occupations: ['farmer', 'worker', 'woman', 'student', 'business', 'other'], minAge: 18, maxAge: 50 },
	'pmsby': { occupations: ['farmer', 'worker', 'woman', 'student', 'business', 'senior', 'other'], minAge: 18, maxAge: 70 },
	'apy': { occupations: ['farmer', 'worker', 'woman', 'business', 'other'], minAge: 18, maxAge: 40 },
	'kcc': { occupations: ['farmer'], minAge: 18 },
	'pmfby': { occupations: ['farmer'], minAge: 18 }
};
for (const sc of schemes) sc.finder = schemeFinderRules[sc.slug];
export const finderOccupations = [
	{ value: 'farmer', label: 'Kisan (Farmer)' },
	{ value: 'worker', label: 'Mazdoor / Kaamgar (Worker)' },
	{ value: 'student', label: 'Chhatra (Student)' },
	{ value: 'woman', label: 'Mahila (Woman)' },
	{ value: 'business', label: 'Vyapari / Dukandaar (Business)' },
	{ value: 'senior', label: 'Varishth Nagarik (Senior Citizen)' },
	{ value: 'other', label: 'Anya (Other)' }
];

export const sectionHindi = {
	categories: 'श्रेणी चुनें',
	popular: 'लोकप्रिय सेवाएँ',
	schemes: 'सरकारी योजनाएँ',
	pricing: 'दर सूची',
	steps: 'काम की प्रक्रिया',
	reviews: 'ग्राहक क्या कहते हैं',
	gallery: 'दुकान की झलक',
	faq: 'सामान्य प्रश्न',
	trust: 'भरोसा और मान्यता',
	tools: 'मुफ़्त ऑनलाइन टूल्स',
	finder: 'योजना खोजें'
};

export const trustBadges = [
	{ title: 'CSC Digital Seva Registered', hindi: 'पंजीकृत केंद्र', text: `CSC ID ${site.cscId} (mock) — Digital Seva portal par panjikrit VLE kendra.` },
	{ title: 'PAN Centre — Protean / UTI', hindi: 'पैन केंद्र', text: 'NSDL-Protean aur UTIITSL dono se PAN application aur correction.' },
	{ title: '9 Saal Ka Tajurba', hindi: 'अनुभव', text: '2017 se Gaya me seva — 25,000+ form aur kaam pure (mock aankde).' },
	{ title: 'Pakki Receipt, Saaf Rate', hindi: 'पारदर्शिता', text: 'Rate board par sab daam likhe hain — sarkari fee alag, receipt ke saath.' }
];
export const partners = ['CSC e-Governance', 'Digital India', 'UIDAI', 'Protean (NSDL)', 'UTIITSL', 'IRCTC', 'NPCI — AePS', 'Bharat BillPay', 'RTPS Bihar', 'National Scholarship Portal', 'Bihar Board (BSEB)', 'Passport Seva'];

export type StatusLink = { name: string; hindi: string; url: string; needs: string };
export type StatusGroup = { category: string; hindi: string; items: StatusLink[] };
export const statusGroups: StatusGroup[] = [
	{ category: 'Identity', hindi: 'पहचान', items: [
		{ name: 'PAN Card Status (Protean)', hindi: 'पैन स्थिति', url: 'https://tin.tin.nsdl.com/pantan/StatusTrack.html', needs: 'Acknowledgement number (15 ankh)' },
		{ name: 'Aadhaar Status / Download (UIDAI)', hindi: 'आधार स्थिति', url: 'https://myaadhaar.uidai.gov.in', needs: 'Aadhaar number + registered mobile (OTP)' },
		{ name: 'Voter ID / EPIC Search (ECI)', hindi: 'मतदाता सूची', url: 'https://electoralsearch.eci.gov.in', needs: 'EPIC number ya naam + janm tithi' },
		{ name: 'Passport Application Status', hindi: 'पासपोर्ट स्थिति', url: 'https://www.passportindia.gov.in', needs: 'File number + date of birth' }
	]},
	{ category: 'Certificates & Ration', hindi: 'प्रमाण पत्र', items: [
		{ name: 'RTPS Bihar — Certificate Status', hindi: 'प्रमाण पत्र स्थिति', url: 'https://serviceonline.bihar.gov.in', needs: 'Application / reference number' },
		{ name: 'Bihar Ration Card List / Status', hindi: 'राशन कार्ड', url: 'https://epds.bihar.gov.in', needs: 'Ration card number / jila-block chayan' }
	]},
	{ category: 'Schemes & Banking', hindi: 'योजना और बैंक', items: [
		{ name: 'PM-Kisan — Kist / Beneficiary Status', hindi: 'पीएम किसान स्थिति', url: 'https://pmkisan.gov.in', needs: 'Aadhaar / registration number' },
		{ name: 'Ayushman (PM-JAY) — Card / Eligibility', hindi: 'आयुष्मान कार्ड', url: 'https://beneficiary.nha.gov.in', needs: 'Mobile number (OTP) / Aadhaar' },
		{ name: 'Train PNR Status (Railways)', hindi: 'पीएनआर स्थिति', url: 'https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html', needs: '10 ankh ka PNR number' }
	]}
];
export const allStatusLinks = statusGroups.flatMap((g) => g.items);

export type DownloadItem = { name: string; hindi: string; kind: 'Blank Form' | 'Checklist' | 'Rate List'; href: string; note: string };
export const downloads: DownloadItem[] = [
	{ name: 'Printable Rate List (poora chart)', hindi: 'दर सूची प्रिंट', kind: 'Rate List', href: '/pricing', note: 'Pricing page kholo aur Print button dabao — A4 par saaf chart niklega.' },
	{ name: 'PAN Application — Documents Checklist', hindi: 'पैन दस्तावेज़ सूची', kind: 'Checklist', href: '/services/pan-new', note: 'Naye PAN ke liye kya-kya chahiye — service page par poori list hai.' },
	{ name: 'Aadhaar Update — Documents Checklist', hindi: 'आधार सुधार सूची', kind: 'Checklist', href: '/services/aadhaar-update', note: 'Naam/address/mobile sudhaar ke liye zaroori kagaz.' },
	{ name: 'RTPS Certificate — Blank Form Jaankari', hindi: 'प्रमाण पत्र फ़ॉर्म', kind: 'Blank Form', href: '/services/income-certificate', note: 'Aay/jati/niwas form bharne ki taiyaari aur documents.' },
	{ name: 'Scholarship Form — Documents Checklist', hindi: 'छात्रवृत्ति सूची', kind: 'Checklist', href: '/services/scholarship-form', note: 'NSP / Post-Matric ke liye marksheet, praman patra, passbook.' },
	{ name: 'Sarkari Naukri Form — Documents Checklist', hindi: 'नौकरी फ़ॉर्म सूची', kind: 'Checklist', href: '/services/govt-job-form', note: 'Photo, signature, marksheet — form reject na ho isliye pehle check karo.' },
	{ name: 'Ayushman Card — Documents Checklist', hindi: 'आयुष्मान सूची', kind: 'Checklist', href: '/services/ayushman-card', note: 'Poore parivar ke Aadhaar aur ration card ki list.' },
	{ name: 'Sab Services Ki Documents Master List', hindi: 'सभी दस्तावेज़ सूची', kind: 'Checklist', href: '#checklists', note: 'Isi page ke neeche har lokpriya service ki checklist ek jagah.' }
];

export type BlogPost = { slug: string; title: string; hindi: string; date: string; dateISO: string; excerpt: string; image: { stem: string; alt: string }; serviceSlug: string; minutes: number; sections: { heading: string; paras: string[] }[] };
export const blogPosts: BlogPost[] = [
	{ slug: 'pan-card-kaise-banaye', title: 'PAN Card Kaise Banaye — Documents, Fees Aur Poori Prakriya', hindi: 'पैन कार्ड कैसे बनवाएँ', date: '05 Nov 2026', dateISO: '2026-11-05', excerpt: 'Naya PAN card banwana hai? Kaun se documents chahiye, e-PAN kitni der me milta hai, physical card kab aata hai aur form me kaun si galti sabse zyada hoti hai — sab kuch saral bhasha me.', image: { stem: '/images/counter-help', alt: 'Counter par PAN card ke documents check karte hue' }, serviceSlug: 'pan-new', minutes: 4, sections: [
		{ heading: 'PAN card kyun zaroori hai?', paras: ['Bank khata, naukri, ITR, bade len-den — har jagah PAN maanga jaata hai. Bina PAN ke kai sarkari aur bank ke kaam atak jaate hain, isliye 18 saal hote hi PAN banwa lena samajhdari hai.'] },
		{ heading: 'Documents — ye 3 cheezein chahiye', paras: ['1) Aadhaar card (naam aur janm tithi bilkul sahi ho), 2) passport size photo, 3) safed kagaz par signature. Aadhaar me mobile number link ho to e-KYC se prakriya aur tez ho jaati hai.', 'Dhyaan dein: Aadhaar aur PAN me naam ki spelling ek jaisi honi chahiye, warna correction me samay lagta hai.'] },
		{ heading: 'Fees aur samay', paras: ['Hamari dukaan par service charge ₹250 hai, sarkari fee alag actual par lagti hai. e-PAN aam taur par turant / kuch ghanton me email par aa jaata hai, physical card 7–10 din me post se ghar pahunchta hai.'] },
		{ heading: 'Sabse aam galtiyaan', paras: ['Galat janm tithi, pita ke naam ki spelling, aur dhundhli photo/signature — yahi teen karan hain jinse PAN form sabse zyada reject hota hai. Dukaan par form submit se pehle har detail aapko dikha kar check karayi jaati hai.'] }
	]},
	{ slug: 'aadhaar-mobile-number-update', title: 'Aadhaar Me Mobile Number Link / Update Kaise Kare', hindi: 'आधार में मोबाइल नंबर जोड़ें', date: '12 Nov 2026', dateISO: '2026-11-12', excerpt: 'Aadhaar se mobile link nahi hai to OTP wala har kaam atakta hai. Mobile number update kahan hota hai, kya biometric zaroori hai, fees kitni hai — poori sachchai, bina ghumaye.', image: { stem: '/images/banking-counter', alt: 'Aadhaar biometric varification hota graahak' }, serviceSlug: 'aadhaar-update', minutes: 4, sections: [
		{ heading: 'Mobile link kyun zaroori hai?', paras: ['PM-Kisan e-KYC, Ayushman card, bank AePS, scholarship — lagbhag har sarkari seva me Aadhaar OTP aata hai. Mobile link na ho to ye sab kaam ruk jaate hain.'] },
		{ heading: 'Sach ye hai — mobile update online ghar baithe nahi hota', paras: ['Mobile number badalna / jodna biometric varification se hota hai, isliye khud Aadhaar kendra ya dukaan par aana padta hai. Jo website ghar baithe mobile update ka daawa kare, usse savdhaan rahein.', 'Hamari dukaan par hum aapko sahi kendra aur prakriya batate hain, aur jo kaam online ho sakta hai (address sudhaar, download, PVC print) wo yahin turant kar dete hain.'] },
		{ heading: 'Fees aur samay', paras: ['Sarkari niyam se demographic update ki fee nishchit hai (dukaan par rate board dekhein). Update ke baad naya number aam taur par 24–72 ghante me sakriya ho jaata hai. Aadhaar se paisa nikalna (AePS) ke liye bhi yahi link kaam aata hai.'] }
	]},
	{ slug: 'pm-kisan-ekyc-kaise-kare', title: 'PM-Kisan e-KYC Kaise Kare — Kist Rukne Se Pehle Ye Karo', hindi: 'पीएम किसान ई-केवाईसी', date: '18 Nov 2026', dateISO: '2026-11-18', excerpt: 'PM-Kisan ki kist ruk gayi hai? Sabse bada karan e-KYC adhura hona hai. OTP e-KYC, biometric e-KYC aur bhulekh satyapan — teeno ka sahi tarika aur status check karne ki vidhi.', image: { stem: '/images/exam-help', alt: 'Staff kisan ki PM-Kisan jaankari computer par check karte hue' }, serviceSlug: 'pm-kisan', minutes: 5, sections: [
		{ heading: 'Kist kyun rukti hai?', paras: ['e-KYC adhura, bank khate me Aadhaar seed na hona, ya bhulekh (zameen) satyapan pending — ye teen karan 90% mamlo me milte hain. Pehle status check karo, karan khud saamne aa jayega.'] },
		{ heading: 'e-KYC ke 2 tarike', paras: ['OTP e-KYC: Aadhaar me mobile link ho to pmkisan.gov.in par OTP se ho jaata hai. Biometric e-KYC: mobile link na ho to CSC par fingerprint se hota hai — ye hamari dukaan par turant ho jaata hai (service charge ₹60).'] },
		{ heading: 'Status kaise check karein', paras: ['PM-Kisan portal par Beneficiary Status me Aadhaar ya registration number dalne se har kist ki jaankari milti hai. Is website ke Track Status page par official link diya hai — ya dukaan par aao, status muft me check karke bata denge.'] }
	]},
	{ slug: 'ayushman-card-kaise-banta-hai', title: 'Ayushman Card Kaise Banta Hai — ₹5 Lakh Muft Ilaaj Ka Card', hindi: 'आयुष्मान कार्ड कैसे बनता है', date: '25 Nov 2026', dateISO: '2026-11-25', excerpt: 'Ayushman Bharat (PM-JAY) card se har saal ₹5 lakh tak ka ilaaj muft hota hai. Kaun patr hai, naam list me kaise check karein, card banne me kya lagta hai — poori guide.', image: { stem: '/images/happy-customer', alt: 'Parivar Ayushman card paakar khush' }, serviceSlug: 'ayushman-card', minutes: 4, sections: [
		{ heading: 'Kaun patr hai?', paras: ['Jinka naam SECC list / ration card ki patr suchi me hai, ve parivar PM-JAY ke hakdaar hain. Kai parivar ko pata hi nahi ki unka naam list me hai — pehle eligibility check karwana muft hai, dukaan par kar dein.'] },
		{ heading: 'Card banne ki prakriya', paras: ['Har sadasya ka Aadhaar aur ration card chahiye. e-KYC (OTP ya fingerprint) ke baad card turant generate hota hai, aur hum usi samay PVC card print karke de dete hain — kul samay lagbhag 15 minute.'] },
		{ heading: 'Card ka upyog kahan hota hai?', paras: ['Suchibaddh sarkari aur niji hospitalon me bharti hone par card dikhane se ilaaj ka kharcha yojana se katta hai. Apne aas-paas ke suchibaddh hospital ki jaankari bhi dukaan par mil jayegi.'] }
	]}
];
export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const toolsList = [
	{ id: 'photo-resize', name: 'Photo / Signature Resize (KB me)', hindi: 'फ़ोटो आकार बदलें', text: 'Form ke niyam ke hisaab se photo/signature ko sahi KB aur pixel size me badlo — browser me hi, file kahin upload nahi hoti.' },
	{ id: 'compress', name: 'Image Compressor', hindi: 'इमेज छोटा करें', text: 'Badi photo ko quality bachate hue chhota karo — 200 KB, 100 KB ya apni pasand ke size tak.' },
	{ id: 'age', name: 'Age Calculator', hindi: 'उम्र कैलकुलेटर', text: 'Janm tithi se aaj ki sahi umr — saal, mahina, din. Naukri form ki umr-seema check karne ke liye perfect.' },
	{ id: 'emi', name: 'EMI Calculator', hindi: 'किस्त कैलकुलेटर', text: 'Loan ki mahina kist, kul byaj aur kul bhugtan — KCC, personal ya bike loan lene se pehle hisaab saaf.' },
	{ id: 'images-pdf', name: 'Images to PDF', hindi: 'फ़ोटो से PDF', text: 'Documents ki photo ko ek PDF me jodo — print karke PDF save kar lo, form upload ke liye taiyaar.' },
	{ id: 'upi-qr', name: 'UPI QR Generator', hindi: 'UPI QR बनाएँ', text: 'Apni UPI ID ka QR code banao — dukaan, payment ya dost ko bhejne ke liye. Amount pehle se set bhi kar sakte ho.' },
	{ id: 'gst', name: 'GST Calculator', hindi: 'GST कैलकुलेटर', text: 'Rate par GST jodo ya kul keemat me se GST alag karo — 5%, 12%, 18%, 28% sab slabs ka hisaab turant.' }
];
// ---- Round-2 additions: offers, enquiry slots, zones ----
export type Offer = { slug: string; title: string; hindi: string; description: string; priceNote: string; validTill: string; validISO: string; terms: string[]; serviceSlug?: string };
export const offers: Offer[] = [
	{ slug: 'pvc-combo-offer', title: 'PVC Card Combo — 3 Card, Ek Daam', hindi: 'पीवीसी कार्ड कॉम्बो', description: 'Aadhaar + PAN + Voter — teeno card mazboot PVC par ek saath print karwao, combo daam me. Ek-ek karke karwane se sasta padega.', priceNote: '₹120 me 3 PVC card (aam daam ₹150)', validTill: '31 Dec 2026', validISO: '2026-12-31', terms: ['Teeno card ek hi parivar ke hone chahiye', 'Card ki PDF / number saath laayein', 'Offer sirf dukaan par aakar lene par'], serviceSlug: 'pvc-card' },
	{ slug: 'student-form-season', title: 'Student Form Season Offer', hindi: 'छात्र फ़ॉर्म ऑफ़र', description: 'Scholarship + admission form ek saath bharwao — dusre form par service charge aadha. Photo, signature resize bilkul muft.', priceNote: 'Dusra form sirf ₹50 me', validTill: '31 Dec 2026', validISO: '2026-12-31', terms: ['Dono form ek hi chhatra ke, ek hi din bharne par', 'Sarkari / exam fee alag, actual par', 'Photo-signature resize muft sirf form ke saath'], serviceSlug: 'scholarship-form' },
	{ slug: 'bulk-print-offer', title: 'Bulk Print Offer — 100+ Page', hindi: 'थोक प्रिंट ऑफ़र', description: 'Notes, project aur coaching material ke bulk print par khaas daam. WhatsApp par PDF bhejo, taiyaar print aakar le jao.', priceNote: 'B/W print sirf ₹2 / page (100+ page par)', validTill: '15 Dec 2026', validISO: '2026-12-15', terms: ['Kam se kam 100 page ek saath', 'Ek side (single-side) B/W print par lagu', 'File PDF me pehle se taiyaar ho'], serviceSlug: 'printing-xerox' },
	{ slug: 'ayushman-parivar-offer', title: 'Ayushman Parivar Offer', hindi: 'आयुष्मान परिवार ऑफ़र', description: 'Poore parivar ka Ayushman card ek saath banwao — 4 sadasya ke baad ke har card par service charge muft, PVC print ke saath.', priceNote: '5ve sadasya se service charge ₹0', validTill: '31 Dec 2026', validISO: '2026-12-31', terms: ['Sab sadasya ka naam patr suchi (SECC/ration card) me hona chahiye', 'Har sadasya ka Aadhaar + e-KYC zaroori', 'Ek hi din, ek hi parivar par lagu'], serviceSlug: 'ayushman-card' },
	{ slug: 'resume-photo-combo', title: 'Resume + Photo Combo', hindi: 'रिज़्यूमे कॉम्बो', description: 'Naukri ke liye professional resume aur 6 passport photo ek combo me — interview ki taiyaari ek hi baar me poori.', priceNote: 'Combo sirf ₹130 (aam daam ₹150)', validTill: '20 Dec 2026', validISO: '2026-12-20', terms: ['Resume ek page ka standard format', 'Photo ki soft copy mobile par muft', 'Same-day taiyaar, bheed par nirbhar'], serviceSlug: 'resume-typing' },
	{ slug: 'pm-kisan-season-offer', title: 'PM-Kisan e-KYC Season Offer', hindi: 'किसान ई-केवाईसी ऑफ़र', description: 'Kist se pehle e-KYC + beneficiary status check ek saath — biometric e-KYC karwane par status print muft.', priceNote: 'e-KYC ₹60, status print muft', validTill: '31 Dec 2026', validISO: '2026-12-31', terms: ['Aadhaar aur bank passbook saath laayein', 'Biometric ke liye kisan ka khud aana zaroori', 'Status print ek page muft'], serviceSlug: 'pm-kisan' }
];
export const getOffer = (slug: string) => offers.find((o) => o.slug === slug);

// Preferred visit slots for /enquiry (mock, from shop hours).
export const enquirySlots = [
	{ value: '09-11', label: 'Subah 9 – 11 baje' },
	{ value: '11-13', label: 'Subah 11 – Dopahar 1 baje' },
	{ value: '13-15', label: 'Dopahar 1 – 3 baje' },
	{ value: '15-17', label: 'Dopahar 3 – Shaam 5 baje' },
	{ value: '17-20', label: 'Shaam 5 – 8 baje' },
	{ value: 'sun-10-14', label: 'Ravivaar 10 – 2 baje (sirf Ravivaar ko)' }
];
export const slotLabel = (value: string) => enquirySlots.find((s) => s.value === value)?.label ?? value;

export const photoSizeGuide = [
	{ exam: 'SSC (sab exam)', photo: '200 × 230 px', signature: '140 × 60 px', maxKb: 'Photo 20–50 KB · Signature 10–20 KB' },
	{ exam: 'Railway RRB', photo: '350 × 350 px', signature: '100 × 50 px (lagbhag)', maxKb: 'Photo 15–40 KB · Signature 5–20 KB' },
	{ exam: 'Bihar SSC / BPSC', photo: '110 × 140 px (lagbhag)', signature: '140 × 60 px', maxKb: 'Aam taur par 20–50 KB' },
	{ exam: 'Bank (IBPS / SBI)', photo: '200 × 230 px', signature: '140 × 60 px', maxKb: 'Photo 20–50 KB · Signature 10–20 KB' },
	{ exam: 'UPSC', photo: '350 × 350 px', signature: '350 × 150 px', maxKb: 'Photo/Signature 20–300 KB' }
];
