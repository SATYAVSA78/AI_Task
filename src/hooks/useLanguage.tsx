import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi' | 'ta' | 'ml' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // App Header
    loanPortal: 'Loan Portal',
    accessDashboard: 'Access to your loan details',
    
    // Phone Access
    mobileNumber: 'Mobile Number',
    viewDashboard: 'View Dashboard',
    enterMobile: 'Enter your registered mobile number',
    invalidPhone: 'Invalid Phone Number',
    phoneValidation: 'Please enter a valid 10-digit mobile number',
    noLoansFound: 'No loans found for this mobile number',
    
    // Dashboard
    loanSummary: 'Loan Summary',
    applicationId: 'Application ID',
    studentName: 'Student Name',
    coApplicantName: 'Co-Applicant Name',
    nbfcName: 'NBFC Name',
    loanAmount: 'Loan Amount',
    tenure: 'Tenure',
    months: 'months',
    appliedAt: 'Applied At',
    processingFee: 'Processing Fee',
    disbursedAt: 'Disbursed At',
    rateOfInterest: 'Rate of Interest',
    courseAccess: 'Course Access',
    firstEmiDate: 'First EMI Date',
    courseName: 'Course Name',
    downPaymentDate: 'Down Payment Date',
    currentStage: 'Current Stage',
    rejectionReason: 'Rejection Reason',
    yes: 'Yes',
    no: 'No',
    notDisbursed: 'Not Disbursed',
    
    // Actions
    viewTimeline: 'View Timeline',
    contactBda: 'Contact BDA',
    askChatbot: 'Ask Chatbot',
    chooseLanguage: 'Choose Language',
    
    // Timeline
    applicationTimeline: 'Application Timeline',
    
    // Contact BDA
    bdaContactDetails: 'BDA Contact Details',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    close: 'Close',
    
    // Chatbot
    helpAssistant: 'Help Assistant',
    askQuestion: 'Ask a question about your loan...',
    send: 'Send',
    escalateToBda: 'Escalate to BDA',
    
    // Languages
    english: 'English',
    telugu: 'Telugu',
    hindi: 'Hindi',
    tamil: 'Tamil',
    malayalam: 'Malayalam',
    kannada: 'Kannada',
    
    // Additional terms
    loadingDetails: 'Loading your loan details...',
    noLoanApplications: 'No loan applications are associated with your account.',
    loanDashboard: 'Loan Dashboard',
    welcomeBack: 'Welcome back',
    totalAmount: 'Total Amount',
    monthsTenure: 'Months Tenure',
    interestRate: 'Interest Rate',
    progress: 'Progress',
    granted: 'Granted',
    pending: 'Pending',
    call: 'Call',
    from: 'from',
    applicationCurrently: 'Your application is currently in',
    stage: 'stage',
    
    // Stages
    application_created: 'Application Created',
    consent_pending: 'Consent Pending',
    under_review: 'Under Review',
    additional_document_needed: 'Additional Documents Needed',
    additional_documents_submitted: 'Documents Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
    disbursed: 'Disbursed'
  },
  te: {
    // App Header
    loanPortal: 'రుణ పోర్టల్',
    accessDashboard: 'మీ రుణ వివరాలకు ప్రవేశం',
    
    // Phone Access
    mobileNumber: 'మొబైల్ నంబర్',
    viewDashboard: 'డాష్‌బోర్డ్ చూడండి',
    enterMobile: 'మీ నమోదిత మొబైల్ నంబర్‌ను నమోదు చేయండి',
    invalidPhone: 'చెల్లని ఫోన్ నంబర్',
    phoneValidation: 'దయచేసి చెల్లుబాటు అయ్యే 10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
    noLoansFound: 'ఈ మొబైల్ నంబర్‌కు రుణాలు కనుగొనబడలేదు',
    
    // Dashboard
    loanSummary: 'రుణ సారాంశం',
    applicationId: 'అప్లికేషన్ ID',
    studentName: 'విద్యార్థి పేరు',
    coApplicantName: 'సహ-దరఖాస్తుదారు పేరు',
    nbfcName: 'NBFC పేరు',
    loanAmount: 'రుణ మొత్తం',
    tenure: 'కాలపరిమితి',
    months: 'నెలలు',
    appliedAt: 'దరఖాస్తు చేసిన తేదీ',
    processingFee: 'ప్రాసెసింగ్ ఫీజు',
    disbursedAt: 'పంపిణీ చేసిన తేదీ',
    rateOfInterest: 'వడ్డీ రేటు',
    courseAccess: 'కోర్సు యాక్సెస్',
    firstEmiDate: 'మొదటి EMI తేదీ',
    courseName: 'కోర్సు పేరు',
    downPaymentDate: 'డౌన్ పేమెంట్ తేదీ',
    currentStage: 'ప్రస్తుత దశ',
    rejectionReason: 'తిరస్కరణ కారణం',
    yes: 'అవును',
    no: 'లేదు',
    notDisbursed: 'పంపిణీ చేయబడలేదు',
    
    // Actions
    viewTimeline: 'టైమ్‌లైన్ చూడండి',
    contactBda: 'BDA ని సంప్రదించండి',
    askChatbot: 'చాట్‌బాట్‌ను అడుగండి',
    chooseLanguage: 'భాష ఎంచుకోండి',
    
    // Timeline
    applicationTimeline: 'అప్లికేషన్ టైమ్‌లైన్',
    
    // Contact BDA
    bdaContactDetails: 'BDA సంప్రదింపు వివరాలు',
    name: 'పేరు',
    phone: 'ఫోన్',
    email: 'ఇమెయిల్',
    close: 'మూసివేయండి',
    
    // Chatbot
    helpAssistant: 'సహాయ సహాయకుడు',
    askQuestion: 'మీ రుణం గురించి ప్రశ్న అడుగండి...',
    send: 'పంపండి',
    escalateToBda: 'BDA కు మార్చండి',
    
    // Languages
    english: 'ఇంగ్లీష్',
    telugu: 'తెలుగు',
    hindi: 'హిందీ',
    tamil: 'తమిళం',
    malayalam: 'మలయాళం',
    kannada: 'కన్నడ',
    
    // Additional terms
    loadingDetails: 'మీ రుణ వివరాలను లోడ్ చేస్తోంది...',
    noLoanApplications: 'మీ ఖాతాతో రుణ దరఖాస్తులు ఏవీ సంబంధించబడలేదు.',
    loanDashboard: 'రుణ డాష్‌బోర్డ్',
    welcomeBack: 'మళ్లీ స్వాగతం',
    totalAmount: 'మొత్తం రొక',
    monthsTenure: 'నెలల కాలపరిమితి',
    interestRate: 'వడ్డీ రేటు',
    progress: 'పురోగతి',
    granted: 'మంజూరు చేయబడింది',
    pending: 'పెండింగ్‌లో ఉంది',
    call: 'కాల్ చేయండి',
    from: 'నుండి',
    applicationCurrently: 'మీ దరఖాస్తు ప్రస్తుతం ఉంది',
    stage: 'దశలో',
    
    // Stages
    application_created: 'అప్లికేషన్ సృష్టించబడింది',
    consent_pending: 'సమ్మతి పెండింగ్‌లో ఉంది',
    under_review: 'సమీక్షలో ఉంది',
    additional_document_needed: 'అదనపు పత్రాలు అవసరం',
    additional_documents_submitted: 'పత్రాలు సమర్పించబడ్డాయి',
    approved: 'ఆమోదించబడింది',
    rejected: 'తిరస్కరించబడింది',
    disbursed: 'పంపిణీ చేయబడింది'
  },
  hi: {
    // App Header
    loanPortal: 'लोन पोर्टल',
    accessDashboard: 'आपके लोन विवरण तक पहुंच',
    
    // Phone Access
    mobileNumber: 'मोबाइल नंबर',
    viewDashboard: 'डैशबोर्ड देखें',
    enterMobile: 'अपना पंजीकृत मोबाइल नंबर दर्ज करें',
    invalidPhone: 'अमान्य फोन नंबर',
    phoneValidation: 'कृपया एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें',
    noLoansFound: 'इस मोबाइल नंबर के लिए कोई लोन नहीं मिला',
    
    // Dashboard
    loanSummary: 'लोन सारांश',
    applicationId: 'आवेदन ID',
    studentName: 'छात्र का नाम',
    coApplicantName: 'सह-आवेदक का नाम',
    nbfcName: 'NBFC नाम',
    loanAmount: 'लोन राशि',
    tenure: 'अवधि',
    months: 'महीने',
    appliedAt: 'आवेदन की तारीख',
    processingFee: 'प्रसंस्करण शुल्क',
    disbursedAt: 'वितरण की तारीख',
    rateOfInterest: 'ब्याज दर',
    courseAccess: 'कोर्स एक्सेस',
    firstEmiDate: 'पहली EMI तारीख',
    courseName: 'कोर्स का नाम',
    downPaymentDate: 'डाउन पेमेंट तारीख',
    currentStage: 'वर्तमान चरण',
    rejectionReason: 'अस्वीकृति का कारण',
    yes: 'हां',
    no: 'नहीं',
    notDisbursed: 'वितरित नहीं',
    
    // Actions
    viewTimeline: 'टाइमलाइन देखें',
    contactBda: 'BDA से संपर्क करें',
    askChatbot: 'चैटबॉट से पूछें',
    chooseLanguage: 'भाषा चुनें',
    
    // Timeline
    applicationTimeline: 'आवेदन टाइमलाइन',
    
    // Contact BDA
    bdaContactDetails: 'BDA संपर्क विवरण',
    name: 'नाम',
    phone: 'फोन',
    email: 'ईमेल',
    close: 'बंद करें',
    
    // Chatbot
    helpAssistant: 'सहायता सहायक',
    askQuestion: 'अपने लोन के बारे में प्रश्न पूछें...',
    send: 'भेजें',
    escalateToBda: 'BDA को भेजें',
    
    // Languages
    english: 'अंग्रेजी',
    telugu: 'तेलुगु',
    hindi: 'हिंदी',
    tamil: 'तमिल',
    malayalam: 'मलयालम',
    kannada: 'कन्नड़',
    
    // Additional terms
    loadingDetails: 'आपके लोन विवरण लोड हो रहे हैं...',
    noLoanApplications: 'आपके खाते से कोई लोन आवेदन जुड़े नहीं हैं।',
    loanDashboard: 'लोन डैशबोर्ड',
    welcomeBack: 'वापस स्वागत है',
    totalAmount: 'कुल राशि',
    monthsTenure: 'महीनों की अवधि',
    interestRate: 'ब्याज दर',
    progress: 'प्रगति',
    granted: 'प्रदान किया गया',
    pending: 'लंबित',
    call: 'कॉल करें',
    from: 'से',
    applicationCurrently: 'आपका आवेदन वर्तमान में है',
    stage: 'चरण में',
    
    // Stages
    application_created: 'आवेदन बनाया गया',
    consent_pending: 'सहमति लंबित',
    under_review: 'समीक्षाधीन',
    additional_document_needed: 'अतिरिक्त दस्तावेज आवश्यक',
    additional_documents_submitted: 'दस्तावेज जमा किए गए',
    approved: 'स्वीकृत',
    rejected: 'अस्वीकृत',
    disbursed: 'वितरित'
  },
  ta: {
    // App Header
    loanPortal: 'கடன் போர்ட்டல்',
    accessDashboard: 'உங்கள் கடன் விவரங்களுக்கான அணுகல்',
    
    // Phone Access
    mobileNumber: 'மொபைல் எண்',
    viewDashboard: 'டாஷ்போர்டைப் பார்க்கவும்',
    enterMobile: 'உங்கள் பதிவுசெய்யப்பட்ட மொபைல் எண்ணை உள்ளிடவும்',
    invalidPhone: 'தவறான தொலைபேசி எண்',
    phoneValidation: 'தயவுசெய்து சரியான 10-இலக்க மொபைல் எண்ணை உள்ளிடவும்',
    noLoansFound: 'இந்த மொபைல் எண்ணிற்கு கடன்கள் எதுவும் இல்லை',
    
    // Dashboard
    loanSummary: 'கடன் சுருக்கம்',
    applicationId: 'விண்ணப்ப ID',
    studentName: 'மாணவர் பெயர்',
    coApplicantName: 'இணை-விண்ணப்பதாரர் பெயர்',
    nbfcName: 'NBFC பெயர்',
    loanAmount: 'கடன் தொகை',
    tenure: 'காலம்',
    months: 'மாதங்கள்',
    appliedAt: 'விண்ணப்பித்த தேதி',
    processingFee: 'செயலாக்க கட்டணம்',
    disbursedAt: 'விநியோகித்த தேதி',
    rateOfInterest: 'வட்டி விகிதம்',
    courseAccess: 'பாடநெறி அணுகல்',
    firstEmiDate: 'முதல் EMI தேதி',
    courseName: 'பாடநெறி பெயர்',
    downPaymentDate: 'முன்பணம் தேதி',
    currentStage: 'தற்போதைய நிலை',
    rejectionReason: 'நிராகரிப்பு காரணம்',
    yes: 'ஆம்',
    no: 'இல்லை',
    notDisbursed: 'விநியோகிக்கப்படவில்லை',
    
    // Actions
    viewTimeline: 'காலவரிசையைப் பார்க்கவும்',
    contactBda: 'BDA ஐ தொடர்பு கொள்ளவும்',
    askChatbot: 'சாட்போட்டிடம் கேட்கவும்',
    chooseLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    
    // Timeline
    applicationTimeline: 'விண்ணப்ப காலவரிசை',
    
    // Contact BDA
    bdaContactDetails: 'BDA தொடர்பு விவரங்கள்',
    name: 'பெயர்',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    close: 'மூடு',
    
    // Chatbot
    helpAssistant: 'உதவி உதவியாளர்',
    askQuestion: 'உங்கள் கடனைப் பற்றி கேள்வி கேட்கவும்...',
    send: 'அனுப்பு',
    escalateToBda: 'BDA க்கு அனுப்பவும்',
    
    // Languages
    english: 'ஆங்கிலம்',
    telugu: 'தெலுங்கு',
    hindi: 'இந்தி',
    tamil: 'தமிழ்',
    malayalam: 'மலையாளம்',
    kannada: 'கன்னடம்',
    
    // Additional terms
    loadingDetails: 'உங்கள் கடன் விவரங்கள் ஏற்றப்படுகின்றன...',
    noLoanApplications: 'உங்கள் கணக்குடன் கடன் விண்ணப்பங்கள் எதுவும் தொடர்புடையவை இல்லை.',
    loanDashboard: 'கடன் டாஷ்போர்டு',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    totalAmount: 'மொத்த தொகை',
    monthsTenure: 'மாதங்கள் காலம்',
    interestRate: 'வட்டி விகிதம்',
    progress: 'முன்னேற்றம்',
    granted: 'வழங்கப்பட்டது',
    pending: 'நிலுவையில்',
    call: 'அழைக்கவும்',
    from: 'இலிருந்து',
    applicationCurrently: 'உங்கள் விண்ணப்பம் தற்போது உள்ளது',
    stage: 'நிலையில்',
    
    // Stages
    application_created: 'விண்ணப்பம் உருவாக்கப்பட்டது',
    consent_pending: 'ஒப்புதல் நிலுவையில்',
    under_review: 'மதிப்பாய்வில்',
    additional_document_needed: 'கூடுதல் ஆவணங்கள் தேவை',
    additional_documents_submitted: 'ஆவணங்கள் சமர்ப்பிக்கப்பட்டன',
    approved: 'அங்கீகரிக்கப்பட்டது',
    rejected: 'நிராகரிக்கப்பட்டது',
    disbursed: 'விநியோகிக்கப்பட்டது'
  },
  ml: {
    // App Header
    loanPortal: 'ലോൺ പോർട്ടൽ',
    accessDashboard: 'നിങ്ങളുടെ ലോൺ വിശദാംശങ്ങളിലേക്കുള്ള പ്രവേശനം',
    
    // Phone Access
    mobileNumber: 'മൊബൈൽ നമ്പർ',
    viewDashboard: 'ഡാഷ്ബോർഡ് കാണുക',
    enterMobile: 'നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത മൊബൈൽ നമ്പർ നൽകുക',
    invalidPhone: 'അസാധുവായ ഫോൺ നമ്പർ',
    phoneValidation: 'ദയവായി സാധുവായ 10-അക്ക മൊബൈൽ നമ്പർ നൽകുക',
    noLoansFound: 'ഈ മൊബൈൽ നമ്പറിനായി ലോണുകൾ കണ്ടെത്തിയില്ല',
    
    // Dashboard
    loanSummary: 'ലോൺ സംഗ്രഹം',
    applicationId: 'ആപ്ലിക്കേഷൻ ഐഡി',
    studentName: 'വിദ്യാർത്ഥിയുടെ പേര്',
    coApplicantName: 'സഹ-അപേക്ഷകന്റെ പേര്',
    nbfcName: 'NBFC പേര്',
    loanAmount: 'ലോൺ തുക',
    tenure: 'കാലാവധി',
    months: 'മാസങ്ങൾ',
    appliedAt: 'അപേക്ഷിച്ച തീയതി',
    processingFee: 'പ്രോസസിംഗ് ഫീസ്',
    disbursedAt: 'വിതരണം ചെയ്ത തീയതി',
    rateOfInterest: 'പലിശ നിരക്ക്',
    courseAccess: 'കോഴ്സ് ആക്സസ്',
    firstEmiDate: 'ആദ്യ ഇഎംഐ തീയതി',
    courseName: 'കോഴ്സിന്റെ പേര്',
    downPaymentDate: 'ഡൗൺ പേയ്മെന്റ് തീയതി',
    currentStage: 'നിലവിലെ ഘട്ടം',
    rejectionReason: 'നിരസിക്കാനുള്ള കാരണം',
    yes: 'അതെ',
    no: 'ഇല്ല',
    notDisbursed: 'വിതരണം ചെയ്തിട്ടില്ല',
    
    // Actions
    viewTimeline: 'ടൈംലൈൻ കാണുക',
    contactBda: 'ബിഡിഎയുമായി ബന്ധപ്പെടുക',
    askChatbot: 'ചാറ്റ്ബോട്ടിനോട് ചോദിക്കുക',
    chooseLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    
    // Timeline
    applicationTimeline: 'അപേക്ഷ ടൈംലൈൻ',
    
    // Contact BDA
    bdaContactDetails: 'ബിഡിഎ കോൺടാക്റ്റ് വിശദാംശങ്ങൾ',
    name: 'പേര്',
    phone: 'ഫോൺ',
    email: 'ഇമെയിൽ',
    close: 'അടയ്ക്കുക',
    
    // Chatbot
    helpAssistant: 'സഹായ അസിസ്റ്റന്റ്',
    askQuestion: 'നിങ്ങളുടെ ലോണിനെക്കുറിച്ച് ചോദ്യം ചോദിക്കുക...',
    send: 'അയയ്ക്കുക',
    escalateToBda: 'ബിഡിഎയിലേക്ക് എസ്കലേറ്റ് ചെയ്യുക',
    
    // Languages
    english: 'ഇംഗ്ലീഷ്',
    telugu: 'തെലുങ്ക്',
    hindi: 'ഹിന്ദി',
    tamil: 'തമിഴ്',
    malayalam: 'മലയാളം',
    kannada: 'കന്നഡ',
    
    // Additional terms
    loadingDetails: 'നിങ്ങളുടെ ലോൺ വിശദാംശങ്ങൾ ലോഡ് ചെയ്യുന്നു...',
    noLoanApplications: 'നിങ്ങളുടെ അക്കൗണ്ടുമായി ലോൺ അപേക്ഷകൾ ബന്ധപ്പെട്ടിട്ടില്ല.',
    loanDashboard: 'ലോൺ ഡാഷ്ബോർഡ്',
    welcomeBack: 'വീണ്ടും സ്വാഗതം',
    totalAmount: 'മൊത്തം തുക',
    monthsTenure: 'മാസങ്ങളുടെ കാലാവധി',
    interestRate: 'പലിശ നിരക്ക്',
    progress: 'പുരോഗതി',
    granted: 'അനുവദിച്ചു',
    pending: 'പെൻഡിംഗ്',
    call: 'കോൾ ചെയ്യുക',
    from: 'നിന്ന്',
    applicationCurrently: 'നിങ്ങളുടെ അപേക്ഷ നിലവിൽ ഉണ്ട്',
    stage: 'ഘട്ടത്തിൽ',
    
    // Stages
    application_created: 'അപേക്ഷ സൃഷ്ടിച്ചു',
    consent_pending: 'സമ്മതം പെൻഡിംഗ്',
    under_review: 'അവലോകനത്തിൽ',
    additional_document_needed: 'അധിക രേഖകൾ ആവശ്യം',
    additional_documents_submitted: 'രേഖകൾ സമർപ്പിച്ചു',
    approved: 'അംഗീകരിച്ചു',
    rejected: 'നിരസിച്ചു',
    disbursed: 'വിതരണം ചെയ്തു'
  },
  kn: {
    // App Header
    loanPortal: 'ಲೋನ್ ಪೋರ್ಟಲ್',
    accessDashboard: 'ನಿಮ್ಮ ಲೋನ್ ವಿವರಗಳಿಗೆ ಪ್ರವೇಶ',
    
    // Phone Access
    mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    viewDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಿ',
    enterMobile: 'ನಿಮ್ಮ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    invalidPhone: 'ಅಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ',
    phoneValidation: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
    noLoansFound: 'ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಯಾವುದೇ ಲೋನ್ ಕಂಡುಬಂದಿಲ್ಲ',
    
    // Dashboard
    loanSummary: 'ಲೋನ್ ಸಾರಾಂಶ',
    applicationId: 'ಅಪ್ಲಿಕೇಶನ್ ಐಡಿ',
    studentName: 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು',
    coApplicantName: 'ಸಹ-ಅರ್ಜಿದಾರರ ಹೆಸರು',
    nbfcName: 'NBFC ಹೆಸರು',
    loanAmount: 'ಲೋನ್ ಮೊತ್ತ',
    tenure: 'ಅವಧಿ',
    months: 'ತಿಂಗಳುಗಳು',
    appliedAt: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ದಿನಾಂಕ',
    processingFee: 'ಪ್ರೊಸೆಸಿಂಗ್ ಫೀಸ್',
    disbursedAt: 'ವಿತರಣೆ ದಿನಾಂಕ',
    rateOfInterest: 'ಬಡ್ಡಿ ದರ',
    courseAccess: 'ಕೋರ್ಸ್ ಪ್ರವೇಶ',
    firstEmiDate: 'ಮೊದಲ EMI ದಿನಾಂಕ',
    courseName: 'ಕೋರ್ಸ್ ಹೆಸರು',
    downPaymentDate: 'ಡೌನ್ ಪೇಮೆಂಟ್ ದಿನಾಂಕ',
    currentStage: 'ಪ್ರಸ್ತುತ ಹಂತ',
    rejectionReason: 'ತಿರಸ್ಕಾರದ ಕಾರಣ',
    yes: 'ಹೌದು',
    no: 'ಇಲ್ಲ',
    notDisbursed: 'ವಿತರಿಸಲಾಗಿಲ್ಲ',
    
    // Actions
    viewTimeline: 'ಟೈಮ್‌ಲೈನ್ ನೋಡಿ',
    contactBda: 'BDA ಅನ್ನು ಸಂಪರ್ಕಿಸಿ',
    askChatbot: 'ಚಾಟ್‌ಬಾಟ್ ಅನ್ನು ಕೇಳಿ',
    chooseLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    
    // Timeline
    applicationTimeline: 'ಅಪ್ಲಿಕೇಶನ್ ಟೈಮ್‌ಲೈನ್',
    
    // Contact BDA
    bdaContactDetails: 'BDA ಸಂಪರ್ಕ ವಿವರಗಳು',
    name: 'ಹೆಸರು',
    phone: 'ಫೋನ್',
    email: 'ಇಮೇಲ್',
    close: 'ಮುಚ್ಚಿ',
    
    // Chatbot
    helpAssistant: 'ಸಹಾಯ ಸಹಾಯಕ',
    askQuestion: 'ನಿಮ್ಮ ಲೋನ್ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ...',
    send: 'ಕಳುಹಿಸಿ',
    escalateToBda: 'BDA ಗೆ ಎಸ್ಕಲೇಟ್ ಮಾಡಿ',
    
    // Languages
    english: 'ಇಂಗ್ಲಿಷ್',
    telugu: 'ತೆಲುಗು',
    hindi: 'ಹಿಂದಿ',
    tamil: 'ತಮಿಳು',
    malayalam: 'ಮಲಯಾಳಂ',
    kannada: 'ಕನ್ನಡ',
    
    // Additional terms
    loadingDetails: 'ನಿಮ್ಮ ಲೋನ್ ವಿವರಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    noLoanApplications: 'ನಿಮ್ಮ ಖಾತೆಯೊಂದಿಗೆ ಯಾವುದೇ ಲೋನ್ ಅರ್ಜಿಗಳು ಸಂಬಂಧಿಸಿಲ್ಲ.',
    loanDashboard: 'ಲೋನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    welcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    totalAmount: 'ಒಟ್ಟು ಮೊತ್ತ',
    monthsTenure: 'ತಿಂಗಳುಗಳ ಅವಧಿ',
    interestRate: 'ಬಡ್ಡಿ ದರ',
    progress: 'ಪ್ರಗತಿ',
    granted: 'ಅನುಮತಿಸಲಾಗಿದೆ',
    pending: 'ಬಾಕಿ',
    call: 'ಕರೆ ಮಾಡಿ',
    from: 'ನಿಂದ',
    applicationCurrently: 'ನಿಮ್ಮ ಅರ್ಜಿ ಪ್ರಸ್ತುತ ಇದೆ',
    stage: 'ಹಂತದಲ್ಲಿ',
    
    // Stages
    application_created: 'ಅಪ್ಲಿಕೇಶನ್ ರಚಿಸಲಾಗಿದೆ',
    consent_pending: 'ಒಪ್ಪಿಗೆ ಬಾಕಿ',
    under_review: 'ಪರಿಶೀಲನೆಯಲ್ಲಿ',
    additional_document_needed: 'ಹೆಚ್ಚುವರಿ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿದೆ',
    additional_documents_submitted: 'ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ',
    approved: 'ಅನುಮೋದಿಸಲಾಗಿದೆ',
    rejected: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    disbursed: 'ವಿತರಿಸಲಾಗಿದೆ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};