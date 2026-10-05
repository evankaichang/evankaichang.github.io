/* ==========================================================================
   projects.js  —  THE ONLY FILE YOU NEED TO EDIT TO ADD A PROJECT

   1. Drop your photos in:  images/<your-project-slug>/
   2. Copy one of the project blocks below, paste it into the list,
      and change the text + image paths.
   3. Save, refresh the page. Done.

   The order of the projects in this list is the order they appear on the
   page (first one = top-left).
   ========================================================================== */


/* --- Site-wide text. Edit freely. ---------------------------------------- */
const siteConfig = {
  name: "Evan Chang",
  role: "Mechanical Engineering",
  tagline:
    "I design, machine, and build things that move — competition robots, " +
    "custom mechanisms, and the occasional weekend project.",

  // Set any of these to "" (an empty string) to hide that button.
  email: "evankchang8@gmail.com",
  resumeUrl: "",   // e.g. "files/EvanChang-Resume.pdf"
  linkedinUrl: "", // e.g. "https://linkedin.com/in/evanchang"
  githubUrl: "",   // e.g. "https://github.com/evanchang"
};


/* --- Projects ------------------------------------------------------------
   Every field is optional except `title`. Leave a field out and the site
   simply won't render it — no blank boxes, no broken layout.

   {
     title:    "Project Name",
     subtitle: "One line under the title",
     role:     "Your role on the team",   // shown as a small label
     year:     "2025",
     status:   "in-progress",             // omit entirely, or "in-progress"
     tags:     ["CAD", "Machining"],      // these become the filter buttons
     summary:  "A sentence or two, shown on the card.",
     sections: [                          // as many as you like
       { heading: "System Overview", items: ["a bullet", "another bullet"] },
     ],
     images: [                            // first image = the card's cover
       { src: "images/folder/photo.jpg", caption: "What this shows" },
     ],
   }
   ------------------------------------------------------------------------ */

const projects = [

  {
    title: "Pick and Place Robot",
    subtitle: "Competition robot for a two-game-piece scoring challenge",
    role: "Technical Director",
    tags: ["Robotics", "CAD", "Leadership"],
    summary:
      "A swerve-drive competition robot built around a single-stage elevator " +
      "and a double-sided end effector that handles both game pieces, with a " +
      "retractable funnel that clears space for the climbing mechanism.",
    sections: [
      {
        heading: "System Overview",
        items: [
          "1-stage elevator reaching all levels of scoring",
          "Retractable funnel to make room for the climbing mechanism",
          "Swerve drivetrain",
          "Double-sided end effector to pick up both game pieces",
        ],
      },
      {
        heading: "My Contribution",
        items: [
          "Led all prototyping",
          "Prototyped, designed, and saw through the machining of the end effector (V6)",
          "Oversaw design and game strategy",
          "Helped fabricate, assemble, and wire the robot",
        ],
      },
      {
        heading: "Skills Learned & Challenges",
        items: [
          "CAD — integrating systems designed by different people",
          "Teaching newer members",
          "Time management across parallel subsystems",
          "Delegation",
          "Conflict resolution",
        ],
      },
    ],
    images: [
      { src: "images/pick-and-place-robot/robot-complete.jpg", caption: "The completed robot" },
      { src: "images/pick-and-place-robot/end-effector-cad-v6.jpg", caption: "End effector CAD — V6" },
      { src: "images/pick-and-place-robot/robot-in-shop.jpg", caption: "Assembly in the shop" },
      { src: "images/pick-and-place-robot/early-prototype.jpg", caption: "Early elevator prototype (V1 / V2)" },
    ],
  },

  {
    title: "Disk Shooting Robot",
    subtitle: "Flywheel shooter on an adjustable-angle pivot",
    role: "Build Captain",
    tags: ["Robotics", "Machining", "CAD"],
    summary:
      "Led fabrication, assembly, and wiring for a robot that launches " +
      "disk-shaped game pieces from independent flywheels on a dual-gearbox " +
      "pivot, with a rebound bar for consistency into the low-angle goal.",
    sections: [
      {
        heading: "System Overview",
        items: [
          "Dual gearbox pivot with adjustable shooting angle",
          "Independent flywheels for consistent shooting of the disk-shaped game piece",
          "Motor-actuated bar rebounds disks into the low-angle goal slot for added consistency",
        ],
      },
      {
        heading: "My Contribution",
        items: [
          "Led the robot fabrication, assembly, and wiring process",
          "Wrote CAM for in-house parts",
          "Optimized CAM settings for faster fabrication",
          "Machined parts on manual lathe, mill, 3D printers, and 3-axis CNCs",
          "Prototyped the intake mechanism",
          "Designed the centering mechanism for the intake",
        ],
      },
      {
        heading: "Skills Learned",
        items: ["CAD", "CAM", "Electronics", "Machining", "Design for manufacturing"],
      },
    ],
    images: [
      { src: "images/disk-shooting-robot/robot-complete.jpg", caption: "The completed robot" },
      { src: "images/disk-shooting-robot/cnc-machining.jpg", caption: "Machining an in-house part on the 3-axis CNC" },
      { src: "images/disk-shooting-robot/intake-prototype.jpg", caption: "Intake prototype" },
    ],
  },

  {
    title: "Battery Module Mounting",
    subtitle: "A one-size-fits-all bracket for out-of-tolerance modules",
    tags: ["CAD", "Machining"],
    summary:
      "Designed and iterated on mounting brackets for battery modules whose " +
      "own mounting holes were wildly out of tolerance, then manufactured and " +
      "assembled the spot-welded module.",
    sections: [
      {
        heading: "My Contribution",
        items: [
          "Designed and iterated upon the battery module mounting brackets",
          "Designed a one-size-fits-all mounting system, since the module mounting holes were wildly out of tolerance",
          "Manufactured and assembled the spot-welded module",
        ],
      },
    ],
    images: [
      { src: "images/battery-module-mounting/module-assembly-cad.jpg", caption: "Full module assembly" },
      { src: "images/battery-module-mounting/mounting-bracket-cad.jpg", caption: "The mounting bracket" },
    ],
  },

  {
    title: "Wind Up Car",
    subtitle: "For my neighbor, who wanted to know how they work :)",
    tags: ["3D Printing", "CAD", "Personal"],
    summary:
      "A fully custom, fully 3D-printed wind-up car that travels 12 feet on an " +
      "ABS torsion spring, with a gearbox that shifts from 1:15 to fully " +
      "disengaged so it can coast out the last of its distance.",
    sections: [
      {
        heading: "Design Highlights",
        items: [
          "ABS torsion spring allowing the car to travel 12 feet",
          "Shifting gearbox, from 1:15 to disengaging for maximum distance",
          "Custom designed and fully 3D printed, except for the rubber wheels",
        ],
      },
    ],
    images: [
      { src: "images/wind-up-car/car-assembled.jpg", caption: "The finished car" },
    ],
  },

  {
    title: "Push Up Counter",
    subtitle: "Proper form, an honest tally, and 100 pushups a day",
    tags: ["Electronics", "Personal"],
    summary:
      "A device that checks depth, counts reps, and keeps a daily tally on an " +
      "LCD — built around an ESP32 on my first-ever PCB design.",
    sections: [
      {
        heading: "Why I Built It",
        items: [
          "To make sure every rep hit proper depth",
          "To keep a running tally toward my goal of 100 pushups a day",
        ],
      },
      {
        heading: "What I Learned",
        items: [
          "Made my first PCB design in KiCAD",
          "Used an ESP32 to drive the LCD display",
        ],
      },
    ],
    images: [
      { src: "images/push-up-counter/counter-enclosure.jpg", caption: "Finished unit — 25 reps, 50 of 100 for the day" },
      { src: "images/push-up-counter/pcb-kicad-build.jpg", caption: "First PCB design, populated" },
    ],
  },

  {
    title: "Desk Lamp",
    subtitle: "Fully custom 3D printed minimalist desk lamp",
    tags: ["3D Printing", "CAD", "Electronics", "Personal"],
    summary:
      "Fully custom 3D printed minimalist desk lamp. There is no switch — " +
      "rotating the body of the lamp sets the PWM duty cycle, so the same " +
      "motion turns it on, dims it, and shuts it off.",
    sections: [
      {
        heading: "Design Highlights",
        items: [
          "Switchless: rotation of the lamp body drives the PWM duty cycle to the LED",
          "One continuous motion covers on, dim, and off — no buttons or knobs anywhere on the lamp",
          "Ribbed helical shell diffuses the light through the printed wall",
          "Fully custom designed and 3D printed",
        ],
      },
    ],
    images: [
      { src: "images/desk-lamp/lamp-lit.jpg", caption: "Lit on the bench" },
      { src: "images/desk-lamp/section-view-cad.jpg", caption: "CAD section view — internals and base" },
      { src: "images/desk-lamp/lamp-demo.mp4", caption: "Rotating the body to dim — bright, down low, then off" },
    ],
  },

  {
    title: "Portable Speaker",
    subtitle: "Amp, battery, and driver in a case I can throw in a bag",
    status: "in-progress",
    tags: ["Electronics", "Personal"],
    summary: "In progress — currently working through the amp and battery stage.",
    images: [
      { src: "images/portable-speaker/speaker-wip.jpg", caption: "Work in progress" },
    ],
  },

];
