const slides = [
  {
    topic: "Electrical Cables",
    question: "What is the main purpose of the insulation layer on an aircraft electrical wire?",
    answer: "The insulation layer electrically separates the conductor from surrounding structure, other wires, and personnel. Its main purpose is to prevent short circuits, arcing, current leakage, and accidental contact while also giving the wire basic environmental protection against moisture, abrasion, and contamination."
  },
  {
    topic: "Riveting",
    question: "Name the two main parts of a solid rivet before it is installed.",
    answer: "A solid rivet has two main parts before installation: the head and the shank. The head is the factory-formed portion already shaped on one end, while the shank is the straight cylindrical body that passes through the hole and is later deformed to form the shop head."
  },
  {
    topic: "Bearings",
    question: "What is the primary function of a lubricant (oil or grease) inside a bearing?",
    answer: "The primary function of lubricant inside a bearing is to reduce friction between moving surfaces. By creating a thin protective film, it also limits wear, helps remove heat, protects against corrosion, and extends bearing service life."
  },
  {
    topic: "EWIS",
    question: "What does the acronym EWIS stand for in aircraft maintenance?",
    answer: "EWIS stands for Electrical Wiring Interconnection System. In aircraft maintenance, this term covers the wires, cables, connectors, terminals, clamps, and related components used to transmit electrical power and signals throughout the aircraft."
  },
  {
    topic: "Pipes and Hoses",
    question: "Why are flexible hoses used in areas where components move or vibrate?",
    answer: "Flexible hoses are used where components move or vibrate because they can absorb motion, vibration, and slight misalignment without cracking. This prevents fatigue failure, reduces stress on fittings, and maintains a reliable fluid path in locations where rigid pipe would be too brittle or stressed."
  },
  {
    topic: "Transmissions",
    question: "In a simple gear system, what happens to the direction of rotation of the second gear if it is driven by a first gear?",
    answer: "In a simple external gear pair, the second gear rotates in the opposite direction to the first gear. This happens because the teeth mesh directly, so one gear turning clockwise forces the other to turn counterclockwise."
  },
  {
    topic: "Connectors",
    question: "What is the purpose of the coupling nut on a circular electrical connector?",
    answer: "The coupling nut is used to mechanically secure the two halves of the connector together. It provides a firm lock, helps maintain proper contact pressure between the pins and sockets, and prevents the connector from loosening under vibration."
  },
  {
    topic: "Control Cables",
    question: "What material are most aircraft control cables made of to prevent corrosion and provide strength?",
    answer: "Most aircraft control cables are made from corrosion-resistant steel, usually stainless steel. This material provides high tensile strength, good flexibility, and resistance to corrosion in service."
  },
  {
    topic: "Springs",
    question: "What is the main characteristic of a coil spring (helical spring)?",
    answer: "The main characteristic of a coil spring is that it stores mechanical energy when it is compressed, extended, or twisted, depending on its design. Its helical shape allows it to deflect under load and then return toward its original shape when the load is removed."
  },
  {
    topic: "Electrical Cables",
    question: "Why is it important to use the correct color-coding or marking for aircraft wires?",
    answer: "Correct color-coding or marking is important because it allows maintenance personnel to identify wires quickly and accurately. Proper identification reduces the risk of wiring errors, incorrect troubleshooting, wrong connections, and accidental damage during inspection or repair."
  },
  {
    topic: "Riveting",
    question: "What tool is commonly used to support the head of the rivet while the other side is being hammered (driven)?",
    answer: "A bucking bar is commonly used to support the rivet head or react against the rivet while the opposite end is driven. It provides the necessary solid backing so the shank can deform properly and form a correct shop head."
  },
  {
    topic: "Bearings",
    question: "Name one common type of bearing used for low-friction rotation.",
    answer: "One common bearing used for low-friction rotation is a ball bearing. Ball bearings use rolling elements between inner and outer races to reduce friction and support rotational movement efficiently."
  },
  {
    topic: "EWIS",
    question: "Why should electrical wire bundles be kept away from fluid lines like fuel or hydraulic pipes?",
    answer: "Electrical wire bundles should be kept away from fluid lines to reduce the risk of chafing, contamination, and fire hazards. If a fluid line leaks, the fluid could damage insulation or create a flammable condition, while contact between the systems can also accelerate wear and maintenance problems."
  },
  {
    topic: "Pipes and Hoses",
    question: "What is a rigid pipe usually made of in an aircraft structure?",
    answer: "A rigid pipe in aircraft structure is usually made of metal tubing, commonly aluminum alloy for light weight or corrosion-resistant steel where higher strength or pressure resistance is required. The exact material depends on system pressure, temperature, and installation needs."
  },
  {
    topic: "Springs",
    question: "In what simple aircraft component might you find a return spring?",
    answer: "A return spring can be found in simple aircraft components such as switches, levers, valves, or latch mechanisms. Its purpose is to return the component to its normal or neutral position after the operating force is removed."
  },
  {
    topic: "Connectors",
    question: "What are the pins and sockets inside an electrical connector?",
    answer: "Pins and sockets are the electrical contacts inside a connector. The pins are usually the projecting male contacts, while the sockets are the mating female contacts that receive them and complete the electrical circuit."
  },
  {
    topic: "Control Cables",
    question: "What is a turnbuckle used for in a cable system?",
    answer: "A turnbuckle is used to adjust and set the correct tension in a cable system. By rotating its body, the effective length of the cable assembly changes, allowing maintenance personnel to fine-tune cable tension and rigging."
  },
  {
    topic: "Transmissions",
    question: "What is the simplest way to transmit rotary motion from one shaft to another nearby shaft?",
    answer: "The simplest way is by using a pair of meshing gears. Gears provide direct transmission of rotary motion between nearby shafts and can also change direction, speed, or torque depending on their size relationship."
  },
  {
    topic: "Electrical Cables",
    question: "What does wire gauge (AWG) measure?",
    answer: "Wire gauge, such as AWG, measures the size of the wire conductor. In practical terms it indicates the conductor diameter and therefore affects current-carrying capacity, resistance, and allowable use in the aircraft electrical system."
  },
  {
    topic: "Riveting",
    question: "Why must the hole for a rivet be slightly larger than the rivet diameter before installation?",
    answer: "The rivet hole must be slightly larger so the rivet can be inserted without damaging the material or the rivet itself. The clearance must still be controlled because during installation the rivet expands to fill the hole and create a tight, strong joint."
  },
  {
    topic: "Bearings",
    question: "What part of the bearing holds the balls or rollers in their correct positions?",
    answer: "The cage, also called the retainer, holds the balls or rollers in their correct positions. It keeps the rolling elements evenly spaced and prevents them from bunching together during operation."
  },
  {
    topic: "EWIS",
    question: "What is used to secure wire bundles to the aircraft structure to prevent them from sagging?",
    answer: "Wire bundles are normally secured with clamps, supports, or approved cable ties, depending on the installation. These supports prevent sagging, reduce vibration damage, and keep the wires clear of moving parts, sharp edges, and fluid lines."
  },
  {
    topic: "Pipes and Hoses",
    question: "How can you tell if a flexible hose is twisted during installation?",
    answer: "A flexible hose is twisted if its layline, stripe, or printed marking does not run straight along the hose length after installation. A twist can also show up as abnormal fitting alignment and should be corrected because it shortens hose life."
  },
  {
    topic: "Springs",
    question: "What happens to a spring when the external force acting on it is removed?",
    answer: "When the external force is removed, the spring tends to return to its original shape or free length, provided it has not been overstressed beyond its elastic limit. This elastic recovery is the basic working principle of a spring."
  },
  {
    topic: "Connectors",
    question: "Why do some connectors have different keying positions?",
    answer: "Different keying positions prevent the wrong connector halves from being mated together. Keying ensures correct alignment, avoids cross-connection between similar connectors, and protects the electrical system from installation mistakes."
  },
  {
    topic: "Control Cables",
    question: "What is a pulley used for in a flight control system?",
    answer: "A pulley is used to guide and redirect the path of a control cable through the aircraft structure. It allows the cable to change direction smoothly while minimizing friction and wear in the control system."
  },
  {
    topic: "Transmissions",
    question: "What is a gear ratio?",
    answer: "A gear ratio is the relationship between the number of teeth or rotational speeds of two meshing gears. It determines how speed, torque, and direction change from the driving gear to the driven gear."
  },
  {
    topic: "Electrical Cables",
    question: "What is a terminal lug used for?",
    answer: "A terminal lug is used to terminate a wire so it can be securely connected to a terminal post, stud, bus bar, or equipment connection point. It provides a reliable electrical and mechanical connection when properly crimped or attached."
  },
  {
    topic: "Riveting",
    question: "What is a countersunk hole, and why is it used on the outer skin of an aircraft?",
    answer: "A countersunk hole is a conical recess formed at the top of a hole so a countersunk rivet head can sit flush with the surface. It is used on outer aircraft skin to preserve smooth aerodynamic lines, reduce drag, and avoid projections above the skin surface."
  },
  {
    topic: "Pipes and Hoses",
    question: "What is the purpose of a dust cap on a pipe end during maintenance?",
    answer: "A dust cap is fitted to keep dirt, moisture, and foreign material out of the pipe or hose during maintenance. This protects the system from contamination that could later damage components, block passages, or reduce system reliability."
  }
];

const state = {
  currentIndex: 0
};

const el = {
  slideSelect: document.getElementById("slideSelect"),
  slideProgress: document.getElementById("slideProgress"),
  slideTopic: document.getElementById("slideTopic"),
  slideNumber: document.getElementById("slideNumber"),
  questionText: document.getElementById("questionText"),
  answerText: document.getElementById("answerText"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn")
};

init();

function init() {
  buildSlideSelector();
  bindEvents();
  renderSlide();
}

function buildSlideSelector() {
  el.slideSelect.innerHTML = "";

  slides.forEach((slide, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `Slide ${index + 1} - ${slide.topic}`;
    el.slideSelect.append(option);
  });
}

function bindEvents() {
  el.slideSelect.addEventListener("change", () => {
    state.currentIndex = Number(el.slideSelect.value);
    renderSlide();
  });

  el.prevBtn.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderSlide();
    }
  });

  el.nextBtn.addEventListener("click", () => {
    if (state.currentIndex < slides.length - 1) {
      state.currentIndex += 1;
      renderSlide();
    }
  });
}

function renderSlide() {
  const slide = slides[state.currentIndex];

  el.slideSelect.value = String(state.currentIndex);
  el.slideProgress.textContent = `${state.currentIndex + 1} / ${slides.length}`;
  el.slideTopic.textContent = slide.topic;
  el.slideNumber.textContent = `Slide ${state.currentIndex + 1}`;
  el.questionText.textContent = slide.question;
  el.answerText.innerHTML = `<strong>Answer:</strong> ${slide.answer}`;

  el.prevBtn.disabled = state.currentIndex === 0;
  el.nextBtn.disabled = state.currentIndex === slides.length - 1;
}
