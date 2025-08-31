// PosiVibes - Loads moods.json, displays icons, shows details on click
// Uses Font Awesome for icons, beautiful transitions

const moodIcons = {
  "Anger": "fa-face-angry",
  "Confusion": "fa-circle-question",
  "Envy": "fa-face-grin-stars",
  "Death of loved one": "fa-face-sad-tear",
  "Depression": "fa-face-sad-cry",
  "Discriminated": "fa-user-slash",
  "Fear": "fa-face-surprise",
  "Feeling sinful": "fa-face-frown-open",
  "Greed": "fa-coins",
  "Laziness": "fa-bed",
  "Loneliness": "fa-user",
  "Losing hope": "fa-face-meh",
  "Practicing forgiveness": "fa-hands-praying",
  "Pride": "fa-crown",
  "Seeking peace": "fa-dove",
  "Temptation": "fa-apple-whole",
  "Demotivated": "fa-face-tired",
  "Uncontrolled mind": "fa-brain",
  "Lust": "fa-heart",
  "Forgetfulness": "fa-calendar-xmark"
};


async function loadMoods() {
  try {
    // For GitHub Pages, use relative path
    const res = await fetch('moods.json');
    if (!res.ok) throw new Error('Failed to load moods.json');
    return await res.json();
  } catch (e) {
    // fallback: return empty array
    return [];
  }
}


function createMoodCard(mood) {
  const card = document.createElement('div');
  card.className = 'mood-card';
  let iconClass = moodIcons[mood.topic] || 'fa-face-smile';
  // fallback to emoji if Font Awesome fails
  let emoji = {
    "Anger": "😡", "Confusion": "❓", "Envy": "🌟", "Death of loved one": "😢", "Depression": "😭", "Discriminated": "🚫", "Fear": "😱", "Feeling sinful": "😔", "Greed": "💰", "Laziness": "🛏️", "Loneliness": "🧑", "Losing hope": "😕", "Practicing forgiveness": "🙏", "Pride": "👑", "Seeking peace": "🕊️", "Temptation": "🍏", "Demotivated": "🥱", "Uncontrolled mind": "🧠", "Lust": "❤️", "Forgetfulness": "📝"
  };
  card.innerHTML = `
    <div class="mood-icon"><i class="fa-solid ${iconClass}"></i><span class="mood-emoji" style="display:none;">${emoji[mood.topic] || "😊"}</span></div>
    <div class="mood-title">${mood.topic}</div>
  `;
  card.onclick = () => showMoodDetails(mood);
  return card;
}

function showMoodDetails(mood) {
  document.getElementById('detailsTitle').textContent = mood.topic;
  document.getElementById('detailsSolution').textContent = mood.solution;
  document.getElementById('detailsExample').textContent = mood.example;
  document.getElementById('moodDetails').classList.add('active');
}

document.getElementById('closeDetails').onclick = function() {
  document.getElementById('moodDetails').classList.remove('active');
};


document.addEventListener('DOMContentLoaded', async () => {
  const moods = await loadMoods();
  const grid = document.getElementById('moodsGrid');
  if (!moods.length) {
    grid.innerHTML = '<div style="text-align:center;color:#5c7cfa;font-size:1.2rem;">No moods found. Please check moods.json or reload the page.</div>';
    return;
  }
  moods.forEach(mood => {
    grid.appendChild(createMoodCard(mood));
  });
  // Check if Font Awesome loaded
  setTimeout(() => {
    const testIcon = document.createElement('i');
    testIcon.className = 'fa-solid fa-face-angry';
    document.body.appendChild(testIcon);
    const style = window.getComputedStyle(testIcon);
    if (style.fontFamily.indexOf('Font Awesome') === -1) {
      // fallback: show emoji
      document.querySelectorAll('.mood-icon').forEach(el => {
        el.querySelector('i').style.display = 'none';
        el.querySelector('.mood-emoji').style.display = 'inline-block';
      });
    }
    document.body.removeChild(testIcon);
  }, 500);
});
