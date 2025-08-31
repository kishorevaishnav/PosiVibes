// Share button logic for both main and details page
document.addEventListener('DOMContentLoaded', () => {
  function setupShareButton(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = function() {
        const shareUrl = window.location.href;
        if (navigator.share) {
          navigator.share({
            title: 'Positive Vibes',
            text: 'Check out Positive Vibes!',
            url: shareUrl
          });
        } else {
          navigator.clipboard.writeText(shareUrl);
          btn.textContent = 'Link copied!';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa fa-share"></i> Share this site';
          }, 2000);
        }
      };
    }
  }
  setupShareButton('mainShareBtn');
  setupShareButton('shareBtn');
});
// Pastel color palette for moods
const moodColors = {
  "Anger": {bg: "#ffe5e5", border: "#ffb3b3", icon: "#ff6f6f", hover: "#ffb3b3"},
  "Confusion": {bg: "#e5f0ff", border: "#b3d1ff", icon: "#6faaff", hover: "#b3d1ff"},
  "Envy": {bg: "#e5ffe5", border: "#b3ffb3", icon: "#6fff6f", hover: "#b3ffb3"},
  "Death of loved one": {bg: "#f5e5ff", border: "#d1b3ff", icon: "#a86fff", hover: "#d1b3ff"},
  "Depression": {bg: "#e5e5ff", border: "#b3b3ff", icon: "#6f6fff", hover: "#b3b3ff"},
  "Discriminated": {bg: "#fff5e5", border: "#ffe0b3", icon: "#ffb86f", hover: "#ffe0b3"},
  "Fear": {bg: "#e5fff5", border: "#b3ffe0", icon: "#6fffc1", hover: "#b3ffe0"},
  "Feeling sinful": {bg: "#fffbe5", border: "#fff3b3", icon: "#ffe96f", hover: "#fff3b3"},
  "Greed": {bg: "#f0ffe5", border: "#d6ffb3", icon: "#a6ff6f", hover: "#d6ffb3"},
  "Laziness": {bg: "#e5faff", border: "#b3f0ff", icon: "#6fd6ff", hover: "#b3f0ff"},
  "Loneliness": {bg: "#f5e5e5", border: "#e0b3b3", icon: "#d66f6f", hover: "#e0b3b3"},
  "Losing hope": {bg: "#f5ffe5", border: "#e0ffb3", icon: "#d6ff6f", hover: "#e0ffb3"},
  "Practicing forgiveness": {bg: "#e5fff9", border: "#b3ffe6", icon: "#6fffd6", hover: "#b3ffe6"},
  "Pride": {bg: "#fff0e5", border: "#ffd6b3", icon: "#ffa66f", hover: "#ffd6b3"},
  "Seeking peace": {bg: "#e5f5ff", border: "#b3e0ff", icon: "#6fa8ff", hover: "#b3e0ff"},
  "Temptation": {bg: "#ffe5fa", border: "#ffb3e6", icon: "#ff6fd6", hover: "#ffb3e6"},
  "Demotivated": {bg: "#f5ffe5", border: "#e0ffb3", icon: "#d6ff6f", hover: "#e0ffb3"},
  "Uncontrolled mind": {bg: "#e5e5ff", border: "#b3b3ff", icon: "#6f6fff", hover: "#b3b3ff"},
  "Lust": {bg: "#ffe5f0", border: "#ffb3d6", icon: "#ff6fa6", hover: "#ffb3d6"},
  "Forgetfulness": {bg: "#e5fff5", border: "#b3ffe0", icon: "#6fffc1", hover: "#b3ffe0"}
};
// PosiVibes - Loads moods.json, displays icons, shows details on click
// Uses Font Awesome for icons, beautiful transitions

// OpenMoji SVG icon mapping (using OpenMoji CDN)
const moodOpenMoji = {
  "Anger": "1F620", // Angry Face
  "Confusion": "1F615", // Confused Face
  "Envy": "1F60E", // Smiling Face With Sunglasses
  "Death of loved one": "1F622", // Crying Face
  "Depression": "1F61E", // Disappointed Face
  "Discriminated": "1F6AB", // Prohibited
  "Fear": "1F628", // Fearful Face
  "Feeling sinful": "1F614", // Pensive Face
  "Greed": "1F4B0", // Money Bag
  "Laziness": "1F6CF", // Bed
  "Loneliness": "1F9D1", // Person
  "Losing hope": "1F61F", // Worried Face
  "Practicing forgiveness": "1F64F", // Folded Hands
  "Pride": "1F451", // Crown
  "Seeking peace": "1F54A", // Dove
  "Temptation": "1F34E", // Red Apple
  "Demotivated": "1F62B", // Tired Face
  "Uncontrolled mind": "1F9E0", // Brain
  "Lust": "2764", // Heart
  "Forgetfulness": "1F4DD" // Memo
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




function createMoodCard(mood, idx) {
  const card = document.createElement('div');
  card.className = 'mood-card';
  // Assign pastel colors
  let colors = moodColors[mood.topic] || {bg: "#f8fafc", border: "#e0eafc", icon: "#5c7cfa", hover: "#b6c6f7"};
  card.style.setProperty('--mood-bg', colors.bg);
  card.style.setProperty('--mood-border', colors.border);
  card.style.setProperty('--mood-icon', colors.icon);
  card.style.setProperty('--mood-hover', colors.hover);
  // OpenMoji SVG
  const openmojiCode = moodOpenMoji[mood.topic] || "1F60A"; // Default: Smiling Face
  const openmojiUrl = `https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/${openmojiCode}.svg`;
  card.innerHTML = `
    <div class="mood-icon" style="font-size:4.2rem;line-height:1;">
      <img src="${openmojiUrl}" alt="${mood.topic}" style="width:4.2rem;height:4.2rem;vertical-align:middle;" />
    </div>
    <div class="mood-title">${mood.topic}</div>
  `;
  card.onclick = () => showMoodDetails(mood, colors);
  return card;
}


function showMoodDetails(mood, colors) {
  document.getElementById('detailsTitle').textContent = mood.topic;
  document.getElementById('detailsSolution').textContent = mood.solution;
  document.getElementById('detailsExample').textContent = mood.example;
  // Show mood icon
  const openmojiCode = moodOpenMoji[mood.topic] || "1F60A";
  const openmojiUrl = `https://cdn.jsdelivr.net/npm/openmoji@14.0.0/color/svg/${openmojiCode}.svg`;
  document.getElementById('detailsIcon').innerHTML = `<img src="${openmojiUrl}" alt="${mood.topic}" style="width:10.5rem;height:10.5rem;vertical-align:middle;" />`;
  const details = document.getElementById('moodDetails');
  details.style.background = colors ? colors.bg : '#f8fafc';
  details.classList.add('active');
  clearTimeout(moodDetailsTimeout);
  moodDetailsTimeout = setTimeout(() => {
    details.classList.remove('active');
  }, 30000);
}

document.getElementById('closeDetails').onclick = function() {
  document.getElementById('moodDetails').classList.remove('active');
  clearTimeout(moodDetailsTimeout);
};

document.getElementById('backDetails').onclick = function() {
  document.getElementById('moodDetails').classList.remove('active');
  clearTimeout(moodDetailsTimeout);
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
