// ===== COMPLETE UPCYCLING IDEAS DATABASE =====
const upcyclingProjects = [
    // Plastic Projects
    {
        id: 1,
        title: 'Bottle Vertical Garden',
        materials: ['Plastic bottles', 'String', 'Soil', 'Seeds'],
        tools: ['Scissors', 'Nail', 'Marker'],
        difficulty: 'easy',
        time: '1 hour',
        cost: 'Free',
        steps: [
            'Cut a rectangle window in bottle side',
            'Punch holes in bottom for drainage',
            'Punch holes in top for hanging',
            'Fill with soil and seeds',
            'String bottles together vertically'
        ],
        image: '🪴',
        tips: 'Use 2-liter bottles for larger plants'
    },
    {
        id: 2,
        title: 'Plastic Bag Plarn Mat',
        materials: ['Plastic bags', 'Scissors'],
        tools: ['Scissors', 'Crochet hook (size K)'],
        difficulty: 'medium',
        time: '3-4 hours',
        cost: 'Free',
        steps: [
            'Cut bags into 1-inch strips',
            'Loop strips together to make "plarn"',
            'Roll into balls',
            'Crochet or knit into mat',
            'Finish edges'
        ],
        image: '🧶',
        tips: 'Use for doormat or beach bag'
    },
    {
        id: 3,
        title: 'Bottle Cap Art',
        materials: ['Bottle caps', 'Glue', 'Board'],
        tools: ['Hot glue gun', 'Pencil'],
        difficulty: 'easy',
        time: '2 hours',
        cost: 'Free',
        steps: [
            'Collect and clean bottle caps',
            'Sketch design on board',
            'Arrange caps by color',
            'Glue caps in place',
            'Frame or hang'
        ],
        image: '🎨',
        tips: 'Create murals or coasters'
    },
    
    // Glass Projects
    {
        id: 4,
        title: 'Mason Jar Lanterns',
        materials: ['Glass jars', 'Wire', 'Tea lights'],
        tools: ['Pliers', 'Wire cutters'],
        difficulty: 'easy',
        time: '30 mins',
        cost: 'Low',
        steps: [
            'Clean jars thoroughly',
            'Create wire handle around rim',
            'Add decorative elements inside',
            'Place tea light inside',
            'Hang or display'
        ],
        image: '🏮',
        tips: 'Use solar lights for outdoors'
    },
    {
        id: 5,
        title: 'Wine Bottle Tiki Torch',
        materials: ['Wine bottle', 'Torch fuel', 'Wick'],
        tools: ['Drill', 'Glass drill bit', 'Funnel'],
        difficulty: 'hard',
        time: '1 hour',
        cost: '₹200',
        steps: [
            'Clean bottle, remove label',
            'Drill hole in cork/cap',
            'Insert wick through hole',
            'Fill bottle with torch fuel',
            'Insert wick assembly'
        ],
        image: '🔥',
        tips: 'Use colored bottles for effect'
    },
    
    // Paper Projects
    {
        id: 6,
        title: 'Magazine Coasters',
        materials: ['Old magazines', 'Glue', 'Mod Podge'],
        tools: ['Scissors', 'Brush'],
        difficulty: 'easy',
        time: '1 hour',
        cost: 'Free',
        steps: [
            'Roll magazine pages tightly',
            'Glue ends to prevent unrolling',
            'Coil rolls into circles',
            'Glue coils together',
            'Seal with Mod Podge'
        ],
        image: '📰',
        tips: 'Make matching sets as gifts'
    },
    {
        id: 7,
        title: 'Book Page Wreath',
        materials: ['Old book', 'Glue', 'Wire wreath form'],
        tools: ['Scissors', 'Hot glue gun'],
        difficulty: 'medium',
        time: '2 hours',
        cost: 'Free',
        steps: [
            'Remove pages from book',
            'Roll each page into cone',
            'Glue to secure shape',
            'Arrange cones on wire form',
            'Glue in place, add ribbon'
        ],
        image: '📚',
        tips: 'Spray paint for color'
    },
    
    // Metal Projects
    {
        id: 8,
        title: 'Tin Can Herb Garden',
        materials: ['Tin cans', 'Paint', 'Soil', 'Herbs'],
        tools: ['Paint brush', 'Hammer', 'Nail'],
        difficulty: 'easy',
        time: '1.5 hours',
        cost: 'Low',
        steps: [
            'Clean cans, remove labels',
            'Punch drainage holes in bottom',
            'Paint cans in colors',
            'Add soil and herb seeds',
            'Label each herb'
        ],
        image: '🌿',
        tips: 'Group on kitchen windowsill'
    },
    {
        id: 9,
        title: 'Aluminum Can Flowers',
        materials: ['Soda cans', 'Wire', 'Paint'],
        tools: ['Scissors', 'Pliers'],
        difficulty: 'hard',
        time: '2 hours',
        cost: 'Free',
        steps: [
            'Cut can open, flatten',
            'Cut petal shapes from metal',
            'Shape petals with pliers',
            'Paint in flower colors',
            'Assemble with wire stem'
        ],
        image: '🌼',
        tips: 'Wear gloves - edges sharp'
    },
    
    // Textile Projects
    {
        id: 10,
        title: 'T-shirt Tote Bag',
        materials: ['Old t-shirt', 'Scissors'],
        tools: ['Scissors', 'Ruler'],
        difficulty: 'easy',
        time: '15 mins',
        cost: 'Free',
        steps: [
            'Cut off sleeves',
            'Cut out neckline',
            'Cut fringe along bottom',
            'Tie fringe in knots',
            'Turn inside out'
        ],
        image: '🛍️',
        tips: 'No-sew project, wash before using'
    },
    {
        id: 11,
        title: 'Denim Pocket Organizer',
        materials: ['Old jeans', 'Fabric glue'],
        tools: ['Scissors', 'Brush'],
        difficulty: 'easy',
        time: '45 mins',
        cost: 'Free',
        steps: [
            'Cut pockets from jeans',
            'Arrange on fabric backing',
            'Glue pockets in place',
            'Add hanging loop',
            'Hang on wall'
        ],
        image: '👖',
        tips: 'Great for office supplies'
    },
    {
        id: 12,
        title: 'Sweater Pillow',
        materials: ['Old sweater', 'Pillow insert', 'Thread'],
        tools: ['Needle', 'Scissors'],
        difficulty: 'medium',
        time: '1 hour',
        cost: 'Free',
        steps: [
            'Cut sweater to pillow size',
            'Sew three sides closed',
            'Insert pillow form',
            'Sew fourth side closed',
            'Add buttons if desired'
        ],
        image: '🛋️',
        tips: 'Use wool sweaters for warmth'
    },
    
    // E-Waste Projects
    {
        id: 13,
        title: 'Circuit Board Coasters',
        materials: ['Old circuit boards', 'Cork sheet', 'Glue'],
        tools: ['Scissors', 'Sandpaper'],
        difficulty: 'medium',
        time: '1 hour',
        cost: 'Free',
        steps: [
            'Remove components from boards',
            'Sand edges smooth',
            'Cut cork to match shape',
            'Glue cork to back',
            'Apply clear coat'
        ],
        image: '💻',
        tips: 'Geeky gift idea'
    },
    {
        id: 14,
        title: 'CD Mosaic Mirror',
        materials: ['Old CDs', 'Mirror', 'Glue'],
        tools: ['Scissors', 'Tweezers'],
        difficulty: 'hard',
        time: '3 hours',
        cost: 'Low',
        steps: [
            'Break CDs into small pieces',
            'Arrange pieces around mirror',
            'Glue pieces in place',
            'Grout if desired',
            'Frame or hang'
        ],
        image: '💿',
        tips: 'Creates rainbow effect'
    },
    
    // Wood Projects
    {
        id: 15,
        title: 'Pallet Wood Shelf',
        materials: ['Wood pallet', 'Brackets', 'Screws'],
        tools: ['Saw', 'Drill', 'Screwdriver'],
        difficulty: 'medium',
        time: '2 hours',
        cost: 'Free',
        steps: [
            'Disassemble pallet carefully',
            'Cut wood to desired length',
            'Sand all surfaces smooth',
            'Attach brackets to wall',
            'Place shelf on brackets'
        ],
        image: '🪵',
        tips: 'Seal with wood stain'
    },
    {
        id: 16,
        title: 'Wine Crate Plant Stand',
        materials: ['Wine crates', 'Wood glue'],
        tools: ['Sandpaper', 'Clamps'],
        difficulty: 'easy',
        time: '1 hour',
        cost: 'Free',
        steps: [
            'Clean crates thoroughly',
            'Sand rough spots',
            'Stack crates in pattern',
            'Glue together',
            'Add plants'
        ],
        image: '🍷',
        tips: 'Create modular display'
    }
];

// Get projects by material
function getProjectsByMaterial(material) {
    return upcyclingProjects.filter(p => 
        p.materials.some(m => m.toLowerCase().includes(material.toLowerCase()))
    );
}

// Get projects by difficulty
function getProjectsByDifficulty(difficulty) {
    return upcyclingProjects.filter(p => p.difficulty === difficulty);
}

// Search projects
function searchProjects(query) {
    query = query.toLowerCase();
    return upcyclingProjects.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.materials.some(m => m.toLowerCase().includes(query)) ||
        p.steps.some(s => s.toLowerCase().includes(query))
    );
}

// Get random project
function getRandomProject() {
    return upcyclingProjects[Math.floor(Math.random() * upcyclingProjects.length)];
}

// Export
window.upcyclingProjects = upcyclingProjects;
window.getProjectsByMaterial = getProjectsByMaterial;
window.getProjectsByDifficulty = getProjectsByDifficulty;
window.searchProjects = searchProjects;
window.getRandomProject = getRandomProject;