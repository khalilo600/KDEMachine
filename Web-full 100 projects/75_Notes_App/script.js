document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesGrid = document.getElementById('notes-grid');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function createNoteElement(note, index) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.dataset.index = index;

        noteDiv.innerHTML = `
            <textarea>${note.content}</textarea>
            <div class="note-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const textarea = noteDiv.querySelector('textarea');
        textarea.addEventListener('input', (e) => {
            notes[index].content = e.target.value;
            saveNotes();
        });

        const deleteBtn = noteDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        return noteDiv;
    }

    function renderNotes() {
        notesGrid.innerHTML = '';
        notes.forEach((note, index) => {
            notesGrid.appendChild(createNoteElement(note, index));
        });
    }

    addNoteBtn.addEventListener('click', () => {
        const newNote = { content: '' };
        notes.push(newNote);
        saveNotes();
        renderNotes();
    });

    renderNotes();
});