// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding tab content
        document.getElementById(`${tabName}-tab`).style.display = 'block';
    });
});

// Generate timetable function
document.getElementById('generate-btn').addEventListener('click', function() {
    generateTimetable();
    
    // Switch to generate tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.tab[data-tab="generate"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById('generate-tab').style.display = 'block';
});

// Approval functionality
document.getElementById('approve-btn').addEventListener('click', function() {
    document.getElementById('approval-status').textContent = 'Approved';
    document.getElementById('approval-status').style.color = 'var(--success)';
    alert('Timetable approved successfully!');
});

document.getElementById('reject-btn').addEventListener('click', function() {
    document.getElementById('approval-status').textContent = 'Changes Requested';
    document.getElementById('approval-status').style.color = 'var(--warning)';
    alert('Changes requested. Please modify the timetable.');
});

document.getElementById('export-btn').addEventListener('click', function() {
    alert('Timetable exported as PDF successfully!');
});

// Function to generate timetable based on input
function generateTimetable() {
    // Get input values
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;
    const subjectsInput = document.getElementById('subjects').value;
    const facultyInput = document.getElementById('faculty').value;
    const numClassrooms = parseInt(document.getElementById('classrooms').value) || 5;
    const numBatches = parseInt(document.getElementById('batches').value) || 3;
    
    // Parse subjects and faculty
    const subjects = subjectsInput ? subjectsInput.split(',').map(s => s.trim()) : ['Mathematics', 'BEE', 'Mechanics', 'C-Programming'];
    const faculty = facultyInput ? facultyInput.split(',').map(f => f.trim()) : ['Sasmita Kumari Pradhan', 'Dr. MD Siddique', 'Dr. Amit Kumar Sahoo'];
    
    // Sample classrooms and rooms
    const classrooms = Array.from({length: numClassrooms}, (_, i) => `Room-${i+1}`);
    const labs = ['Kautalya C-LAB', 'A_Lab-322', 'Skill Building'];
    const allRooms = [...classrooms, ...labs];
    
    // Time slots
    const timeSlots = [
        '9:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '12:00 - 1:00',
        '1:00 - 2:00',
        '2:00 - 3:00'
    ];
    
    // Days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Create timetable body
    const timetableBody = document.getElementById('timetable-body');
    timetableBody.innerHTML = '';
    
    // Generate rows for each time slot
    timeSlots.forEach((timeSlot, rowIndex) => {
        const row = document.createElement('tr');
        
        // Add time cell
        const timeCell = document.createElement('td');
        timeCell.textContent = timeSlot;
        row.appendChild(timeCell);
        
        // Special case for lunch break
        if (rowIndex === 3) {
            for (let i = 0; i < 6; i++) {
                const cell = document.createElement('td');
                cell.className = 'class-cell';
                const card = document.createElement('div');
                card.className = 'class-card';
                const subject = document.createElement('div');
                subject.className = 'class-subject';
                subject.textContent = 'Lunch Break';
                card.appendChild(subject);
                cell.appendChild(card);
                row.appendChild(cell);
            }
            timetableBody.appendChild(row);
            return;
        }
        
        // Generate cells for each day
        days.forEach((day, dayIndex) => {
            const cell = document.createElement('td');
            cell.className = 'class-cell';
            
            const card = document.createElement('div');
            card.className = 'class-card';
            
            // Randomly select subject, faculty, and room
            const subjectIndex = Math.floor(Math.random() * subjects.length);
            const facultyIndex = Math.floor(Math.random() * faculty.length);
            const roomIndex = Math.floor(Math.random() * allRooms.length);
            
            // Special handling for Saturday (free period)
            if (dayIndex === 5 && rowIndex !== 3) {
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'class-subject';
                subjectDiv.textContent = 'Free Period';
                card.appendChild(subjectDiv);
            } 
            // Regular classes
            else if (rowIndex !== 3) {
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'class-subject';
                subjectDiv.textContent = subjects[subjectIndex] || 'Free Period';
                card.appendChild(subjectDiv);
                
                const facultyDiv = document.createElement('div');
                facultyDiv.className = 'class-faculty';
                facultyDiv.textContent = faculty[facultyIndex] || 'TBA';
                card.appendChild(facultyDiv);
                
                const roomDiv = document.createElement('div');
                roomDiv.className = 'class-room';
                roomDiv.textContent = allRooms[roomIndex] || 'TBA';
                card.appendChild(roomDiv);
            }
            
            cell.appendChild(card);
            row.appendChild(cell);
        });
        
        timetableBody.appendChild(row);
    });
    
    // Show success message
    alert('Timetable generated successfully based on your inputs!');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .parameter-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});