// Portfolio Data
const portfolioData = {
    name: "Breana Fulton",
    initials: "BF",
    title: "Creative Developer & Designer",
    bio: [
        "I build elegant digital experiences that combine beautiful design with powerful functionality. With a passion for clean code and user-centric design, I help brands tell their stories through innovative web applications.",
        "Specialized in modern web technologies and always learning. I believe great products come from understanding both the technical and human side of development."
    ],
    skills: [
        { icon: "⚛️", label: "React" },
        { icon: "🎨", label: "UI/UX Design" },
        { icon: "🚀", label: "Node.js" },
        { icon: "💾", label: "Databases" },
        { icon: "📱", label: "Responsive" },
        { icon: "☁️", label: "Cloud Services" },
        { icon: "🔧", label: "DevOps" },
        { icon: "🎯", label: "TypeScript" }
    ],
    projects: [
        {
            emoji: "🏪",
            title: "MarketPlace Pro",
            description: "Built a comprehensive marketplace platform connecting buyers and sellers with real-time chat, secure payments, and advanced search features.",
            tags: ["React", "Socket.io", "Stripe", "MongoDB"]
        },
        {
            emoji: "🎵",
            title: "SoundWave Studio",
            description: "Developed a music streaming platform with personalized playlists, artist profiles, and collaborative playlist features for music lovers.",
            tags: ["Next.js", "PostgreSQL", "AWS"]
        },
        {
            emoji: "🏃",
            title: "FitTrack Pro",
            description: "Created a comprehensive fitness tracking app with workout plans, nutrition tracking, and progress analytics for health enthusiasts.",
            tags: ["React Native", "Firebase", "Charts.js"]
        },
        {
            emoji: "📚",
            title: "LearnHub",
            description: "Educational platform featuring interactive courses, quizzes, and progress tracking with gamification elements to enhance learning.",
            tags: ["Vue.js", "Django", "Redis"]
        },
        {
            emoji: "🏡",
            title: "RealEstate Finder",
            description: "Property listing platform with virtual tours, mortgage calculators, and AI-powered recommendations for home buyers.",
            tags: ["Angular", "Python", "Google Maps API"]
        },
        {
            emoji: "✈️",
            title: "TravelBuddy",
            description: "Trip planning application with itinerary management, expense splitting, and local recommendations for travelers worldwide.",
            tags: ["React", "Express", "MongoDB"]
        }
    ]
};

// Form Validation Functions
const formValidators = {
    validateName: (value) => {
        if (!value.trim()) return "Please enter your name";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
    },
    
    validateEmail: (value) => {
        if (!value.trim()) return "Email is required";
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!pattern.test(value)) return "Please enter a valid email address";
        return "";
    },
    
    validatePhone: (value) => {
        if (value.trim() && value.trim().length < 10) return "Please enter a valid phone number";
        return "";
    },
    
    validateMessage: (value) => {
        if (!value.trim()) return "Message cannot be empty";
        if (value.trim().length < 20) return "Message should be at least 20 characters";
        return "";
    }
};

// Portfolio Manager Class
class PortfolioManager {
    constructor(data) {
        this.data = data;
        this.formData = {
            name: '',
            email: '',
            phone: '',
            message: ''
        };
    }
    
    // Render Skills Section
    renderSkills() {
        return this.data.skills.map(skill => ({
            icon: skill.icon,
            label: skill.label
        }));
    }
    
    // Render Projects Section
    renderProjects() {
        return this.data.projects.map(project => ({
            emoji: project.emoji,
            title: project.title,
            description: project.description,
            tags: project.tags
        }));
    }
    
    // Validate Form Field
    validateField(fieldName, value) {
        const validatorMap = {
            name: formValidators.validateName,
            email: formValidators.validateEmail,
            phone: formValidators.validatePhone,
            message: formValidators.validateMessage
        };
        
        const validator = validatorMap[fieldName];
        return validator ? validator(value) : "";
    }
    
    // Validate All Form Fields
    validateForm(formInputs) {
        const errors = {};
        let isValid = true;
        
        Object.keys(formInputs).forEach(field => {
            const error = this.validateField(field, formInputs[field]);
            if (error) {
                errors[field] = error;
                isValid = false;
            }
        });
        
        return { isValid, errors };
    }
    
    // Submit Form
    submitForm(formInputs) {
        const validation = this.validateForm(formInputs);
        
        if (validation.isValid) {
            this.formData = { ...formInputs };
            console.log('Form submitted successfully:', this.formData);
            return {
                success: true,
                message: "✨ Message sent! I'll get back to you within 24 hours."
            };
        }
        
        return {
            success: false,
            errors: validation.errors
        };
    }
    
    // Get Portfolio Data
    getAboutData() {
        return {
            name: this.data.name,
            initials: this.data.initials,
            title: this.data.title,
            bio: this.data.bio
        };
    }
    
    // Smooth Scroll Functionality
    smoothScrollTo(targetId, offset = 60) {
        return {
            target: targetId,
            offset: offset,
            behavior: 'smooth'
        };
    }
}

// Navigation Manager Class
class NavigationManager {
    constructor() {
        this.sections = ['about', 'work', 'contact'];
        this.currentSection = 'about';
    }
    
    navigateToSection(sectionId) {
        if (this.sections.includes(sectionId)) {
            this.currentSection = sectionId;
            return {
                success: true,
                section: sectionId
            };
        }
        return {
            success: false,
            message: 'Section not found'
        };
    }
    
    getCurrentSection() {
        return this.currentSection;
    }
    
    getAllSections() {
        return this.sections;
    }
}

// Form Handler Class
class ContactFormHandler {
    constructor() {
        this.fields = {
            name: '',
            email: '',
            phone: '',
            message: ''
        };
        this.errors = {};
        this.isSubmitting = false;
    }
    
    updateField(fieldName, value) {
        if (this.fields.hasOwnProperty(fieldName)) {
            this.fields[fieldName] = value;
            return true;
        }
        return false;
    }
    
    getFieldValue(fieldName) {
        return this.fields[fieldName] || '';
    }
    
    setError(fieldName, errorMessage) {
        this.errors[fieldName] = errorMessage;
    }
    
    clearError(fieldName) {
        delete this.errors[fieldName];
    }
    
    clearAllErrors() {
        this.errors = {};
    }
    
    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
    
    getErrors() {
        return { ...this.errors };
    }
    
    resetForm() {
        this.fields = {
            name: '',
            email: '',
            phone: '',
            message: ''
        };
        this.clearAllErrors();
    }
    
    getFormData() {
        return { ...this.fields };
    }
}

// Initialize Portfolio System
const portfolio = new PortfolioManager(portfolioData);
const navigation = new NavigationManager();
const contactForm = new ContactFormHandler();

// Example Usage Functions

// Get about section data
function getAboutSection() {
    return portfolio.getAboutData();
}

// Get skills for display
function getSkills() {
    return portfolio.renderSkills();
}

// Get projects for display
function getProjects() {
    return portfolio.renderProjects();
}

// Handle navigation
function navigateTo(sectionId) {
    return navigation.navigateToSection(sectionId);
}

// Handle form field update
function updateFormField(fieldName, value) {
    contactForm.updateField(fieldName, value);
    
    // Validate on update
    const error = portfolio.validateField(fieldName, value);
    if (error) {
        contactForm.setError(fieldName, error);
    } else {
        contactForm.clearError(fieldName);
    }
    
    return !error;
}

// Handle form submission
function submitContactForm() {
    const formData = contactForm.getFormData();
    const result = portfolio.submitForm(formData);
    
    if (result.success) {
        contactForm.resetForm();
        return {
            success: true,
            message: result.message
        };
    }
    
    // Set errors in form handler
    Object.keys(result.errors).forEach(field => {
        contactForm.setError(field, result.errors[field]);
    });
    
    return {
        success: false,
        errors: result.errors
    };
}

// Export for use
const PortfolioAPI = {
    getAboutSection,
    getSkills,
    getProjects,
    navigateTo,
    updateFormField,
    submitContactForm,
    getFormErrors: () => contactForm.getErrors(),
    getFormData: () => contactForm.getFormData(),
    getCurrentSection: () => navigation.getCurrentSection()
};

// Example console demonstrations
console.log('=== Portfolio System Initialized ===');
console.log('\nAbout Section:', PortfolioAPI.getAboutSection());
console.log('\nSkills:', PortfolioAPI.getSkills());
console.log('\nProjects:', PortfolioAPI.getProjects());

// Example form interaction
console.log('\n=== Form Validation Examples ===');
updateFormField('name', 'B');
console.log('Short name error:', contactForm.getErrors());

updateFormField('name', 'Breana Fulton');
console.log('Valid name, errors cleared:', contactForm.getErrors());

updateFormField('email', 'invalid-email');
console.log('Invalid email error:', contactForm.getErrors());

updateFormField('email', 'breana@example.com');
updateFormField('message', 'This is a test message that is long enough to pass validation requirements.');
console.log('\nForm submission result:', submitContactForm());