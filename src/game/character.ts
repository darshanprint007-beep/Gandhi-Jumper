/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as THREE from 'three';

export type CharacterSkin = 'classic' | 'dandi' | 'peace';

export interface SkinPalette {
  name: string;
  khadi: number;
  khadiBorder: number;
  skin: number;
  dhoti: number;
  sandals: number;
  glasses: number;
  stick: number;
  glow: number;
}

export const SKINS: Record<CharacterSkin, SkinPalette> = {
  classic: {
    name: 'Classic Khadi',
    khadi: 0xf8fafc, // Pure white handspun khadi
    khadiBorder: 0xe2e8f0,
    skin: 0xd49b72, // Warm Indian skin tone
    dhoti: 0xf1f5f9,
    sandals: 0x78350f, // Traditional leather chappal brown
    glasses: 0xd1d5db, // Silver wire frames
    stick: 0x92400e, // Natural bamboo lathi
    glow: 0x38bdf8, // Peaceful sky blue
  },
  dandi: {
    name: 'Dandi March',
    khadi: 0xfef3c7, // Natural unbleached organic khadi
    khadiBorder: 0xf59e0b, // Saffron accent
    skin: 0xc88f65,
    dhoti: 0xfef9c3,
    sandals: 0x5a230b,
    glasses: 0xf59e0b, // Golden wire frames
    stick: 0x713f12, // Aged teak lathi
    glow: 0xf59e0b, // Warm sunset saffron
  },
  peace: {
    name: 'Satyagraha Peace',
    khadi: 0xffffff,
    khadiBorder: 0x10b981, // Emerald peace trim
    skin: 0xd49b72,
    dhoti: 0xffffff,
    sandals: 0x451a03,
    glasses: 0xe5e7eb,
    stick: 0xa16207,
    glow: 0x10b981, // Radiant emerald peace
  },
};

// Generates procedural texture for Mahatma Gandhiji's recognizable face with kind smile and moustache
function createGandhijiFaceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Skin base
  ctx.fillStyle = '#d49b72';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle warm shading
  const grad = ctx.createRadialGradient(256, 256, 60, 256, 256, 240);
  grad.addColorStop(0, 'rgba(235, 175, 135, 0.4)');
  grad.addColorStop(1, 'rgba(160, 100, 60, 0.45)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Kind, gentle eyes with crinkles of wisdom
  const drawEye = (cx: number, cy: number) => {
    // Eye socket soft shadow
    ctx.fillStyle = 'rgba(120, 70, 40, 0.25)';
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // Gentle curved eyelids (smiling eyes)
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#3e2723';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy - 6, 24, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();

    // Pupil
    ctx.fillStyle = '#2c1810';
    ctx.beginPath();
    ctx.arc(cx, cy + 4, 10, 0, Math.PI * 2);
    ctx.fill();

    // Twinkle highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx + 4, cy + 1, 3, 0, Math.PI * 2);
    ctx.fill();

    // Gentle smile laugh lines / crinkles around eyes
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(80, 40, 20, 0.35)';
    const dir = cx < 256 ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(cx + dir * 26, cy);
    ctx.lineTo(cx + dir * 42, cy - 6);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + dir * 26, cy + 8);
    ctx.lineTo(cx + dir * 40, cy + 12);
    ctx.stroke();
  };

  drawEye(185, 220);
  drawEye(327, 220);

  // Gentle eyebrows
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#5d4037';
  ctx.beginPath();
  ctx.arc(185, 185, 30, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(327, 185, 30, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();

  // Defined nose bridge & tip
  ctx.fillStyle = '#b87d55';
  ctx.beginPath();
  ctx.ellipse(256, 280, 14, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(90, 50, 30, 0.4)';
  ctx.beginPath();
  ctx.arc(245, 290, 7, Math.PI * 0.5, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(267, 290, 7, -Math.PI * 0.5, Math.PI * 0.5);
  ctx.stroke();

  // Iconic Gandhiji Grey/White Moustache
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;

  // Left sweep of moustache
  ctx.beginPath();
  ctx.moveTo(256, 310);
  ctx.bezierCurveTo(230, 312, 190, 325, 175, 345);
  ctx.bezierCurveTo(195, 350, 235, 340, 256, 325);
  ctx.fill();
  ctx.stroke();

  // Right sweep of moustache
  ctx.beginPath();
  ctx.moveTo(256, 310);
  ctx.bezierCurveTo(282, 312, 322, 325, 337, 345);
  ctx.bezierCurveTo(317, 350, 277, 340, 256, 325);
  ctx.fill();
  ctx.stroke();

  // Peaceful, warm smile
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#8d3b24';
  ctx.beginPath();
  ctx.arc(256, 345, 26, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Soft ear indications on side
  ctx.fillStyle = 'rgba(160, 90, 50, 0.4)';
  ctx.beginPath();
  ctx.arc(60, 260, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(452, 260, 35, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class AnimeCharacter {
  public group: THREE.Group;
  private skinPalette: SkinPalette;

  // Hierarchical body parts for smooth natural kinematics
  private rootPivot: THREE.Group;
  private hips: THREE.Group;
  private torso: THREE.Group;
  private head: THREE.Group;
  private glassesGroup: THREE.Group;
  private shawlMesh: THREE.Mesh;
  private pocketWatchGroup: THREE.Group;

  // Arms & Walking Stick (Lathi)
  private leftArmPivot: THREE.Group;
  private rightArmPivot: THREE.Group;
  private lathiGroup: THREE.Group;

  // Legs & Chappals
  private leftLegPivot: THREE.Group;
  private rightLegPivot: THREE.Group;
  private leftForeleg: THREE.Group;
  private rightForeleg: THREE.Group;

  // Peaceful Satyagraha Aura
  private peaceAura: THREE.Mesh;

  // Materials map for dynamic skin switching
  private materials: {
    skin: THREE.MeshStandardMaterial;
    face: THREE.MeshStandardMaterial;
    khadiShawl: THREE.MeshStandardMaterial;
    dhoti: THREE.MeshStandardMaterial;
    sandals: THREE.MeshStandardMaterial;
    glasses: THREE.MeshStandardMaterial;
    lathi: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
  };

  // Animation cycle states
  private runTime: number = 0;
  private flipAngle: number = 0;

  constructor(skinKey: CharacterSkin = 'classic') {
    this.group = new THREE.Group();
    this.skinPalette = SKINS[skinKey];

    // Build PBR materials
    const faceTexture = createGandhijiFaceTexture();

    this.materials = {
      skin: new THREE.MeshStandardMaterial({
        color: this.skinPalette.skin,
        roughness: 0.65,
        metalness: 0.05,
      }),
      face: new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.65,
        metalness: 0.05,
      }),
      khadiShawl: new THREE.MeshStandardMaterial({
        color: this.skinPalette.khadi,
        roughness: 0.85,
        metalness: 0.0,
      }),
      dhoti: new THREE.MeshStandardMaterial({
        color: this.skinPalette.dhoti,
        roughness: 0.8,
        metalness: 0.0,
      }),
      sandals: new THREE.MeshStandardMaterial({
        color: this.skinPalette.sandals,
        roughness: 0.7,
        metalness: 0.1,
      }),
      glasses: new THREE.MeshStandardMaterial({
        color: this.skinPalette.glasses,
        metalness: 0.95,
        roughness: 0.15,
      }),
      lathi: new THREE.MeshStandardMaterial({
        color: this.skinPalette.stick,
        roughness: 0.6,
        metalness: 0.1,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.2,
      }),
    };

    // Root Pivot
    this.rootPivot = new THREE.Group();
    this.group.add(this.rootPivot);

    // HIPS / LOWER TORSO
    this.hips = new THREE.Group();
    this.hips.position.y = 0.95;
    this.rootPivot.add(this.hips);

    // Traditional Khadi Dhoti waist fold
    const dhotiWaistGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.35, 16);
    const dhotiWaist = new THREE.Mesh(dhotiWaistGeo, this.materials.dhoti);
    dhotiWaist.castShadow = true;
    this.hips.add(dhotiWaist);

    // Iconic Vintage Pocket Watch hanging at waist
    this.pocketWatchGroup = new THREE.Group();
    this.pocketWatchGroup.position.set(0.18, 0.02, 0.16);
    const watchGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.015, 12);
    watchGeo.rotateX(Math.PI / 2);
    const watchMesh = new THREE.Mesh(watchGeo, this.materials.metal);
    this.pocketWatchGroup.add(watchMesh);

    // Watch Chain
    const chainGeo = new THREE.TorusGeometry(0.06, 0.008, 6, 12, Math.PI);
    const chainMesh = new THREE.Mesh(chainGeo, this.materials.metal);
    chainMesh.position.set(-0.04, 0.04, 0);
    this.pocketWatchGroup.add(chainMesh);
    this.hips.add(this.pocketWatchGroup);

    // UPPER TORSO & KHADI SHAWL (CHADDAR)
    this.torso = new THREE.Group();
    this.torso.position.y = 0.22;
    this.hips.add(this.torso);

    // Lean bare torso
    const chestGeo = new THREE.BoxGeometry(0.38, 0.48, 0.24);
    const chestMesh = new THREE.Mesh(chestGeo, this.materials.skin);
    chestMesh.position.y = 0.22;
    chestMesh.castShadow = true;
    this.torso.add(chestMesh);

    // Handspun Khadi Shawl draped diagonally across shoulder
    const shawlGeo = new THREE.CylinderGeometry(0.26, 0.32, 0.52, 16, 1, false, -Math.PI * 0.2, Math.PI * 1.4);
    this.shawlMesh = new THREE.Mesh(shawlGeo, this.materials.khadiShawl);
    this.shawlMesh.position.set(0, 0.24, 0);
    this.shawlMesh.rotation.z = -0.15;
    this.shawlMesh.castShadow = true;
    this.torso.add(this.shawlMesh);

    // Floating shawl fold draping backward
    const drapeGeo = new THREE.BoxGeometry(0.32, 0.42, 0.08);
    const drapeMesh = new THREE.Mesh(drapeGeo, this.materials.khadiShawl);
    drapeMesh.position.set(-0.12, 0.15, -0.14);
    drapeMesh.rotation.y = 0.2;
    this.torso.add(drapeMesh);

    // HEAD
    this.head = new THREE.Group();
    this.head.position.y = 0.52;
    this.torso.add(this.head);

    // Gandhiji's gentle cranium
    const headGeo = new THREE.SphereGeometry(0.23, 20, 20);
    headGeo.scale(0.96, 1.05, 1.02);
    const headMesh = new THREE.Mesh(headGeo, this.materials.face);
    headMesh.position.y = 0.22;
    headMesh.castShadow = true;
    this.head.add(headMesh);

    // Distinctive ears
    const earGeo = new THREE.SphereGeometry(0.065, 8, 8);
    earGeo.scale(0.5, 1.2, 0.7);

    const leftEar = new THREE.Mesh(earGeo, this.materials.skin);
    leftEar.position.set(-0.23, 0.22, 0);
    leftEar.rotation.y = -0.3;
    this.head.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, this.materials.skin);
    rightEar.position.set(0.23, 0.22, 0);
    rightEar.rotation.y = 0.3;
    this.head.add(rightEar);

    // ICONIC 3D ROUND WIRE-RIMMED SPECTACLES (GLASSES)
    this.glassesGroup = new THREE.Group();
    this.glassesGroup.position.set(0, 0.23, 0.215);

    // Left round lens rim
    const rimGeo = new THREE.TorusGeometry(0.065, 0.009, 8, 24);
    const leftRim = new THREE.Mesh(rimGeo, this.materials.glasses);
    leftRim.position.set(-0.08, 0, 0);
    this.glassesGroup.add(leftRim);

    // Right round lens rim
    const rightRim = new THREE.Mesh(rimGeo, this.materials.glasses);
    rightRim.position.set(0.08, 0, 0);
    this.glassesGroup.add(rightRim);

    // Spectacles nose bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.05, 6);
    bridgeGeo.rotateZ(Math.PI / 2);
    const bridge = new THREE.Mesh(bridgeGeo, this.materials.glasses);
    bridge.position.set(0, 0.015, 0);
    this.glassesGroup.add(bridge);

    // Spectacle temple arms connecting to ears
    const armGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.24, 6);
    armGeo.rotateX(Math.PI / 2);

    const leftArmWire = new THREE.Mesh(armGeo, this.materials.glasses);
    leftArmWire.position.set(-0.145, 0, -0.11);
    leftArmWire.rotation.y = 0.12;
    this.glassesGroup.add(leftArmWire);

    const rightArmWire = new THREE.Mesh(armGeo, this.materials.glasses);
    rightArmWire.position.set(0.145, 0, -0.11);
    rightArmWire.rotation.y = -0.12;
    this.glassesGroup.add(rightArmWire);

    // Transparent lens glass
    const lensGeo = new THREE.CircleGeometry(0.06, 16);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35,
    });
    const leftLens = new THREE.Mesh(lensGeo, lensMat);
    leftLens.position.set(-0.08, 0, 0.002);
    this.glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, lensMat);
    rightLens.position.set(0.08, 0, 0.002);
    this.glassesGroup.add(rightLens);

    this.head.add(this.glassesGroup);

    // ARMS
    this.leftArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.25, 0.42, 0);
    this.torso.add(this.leftArmPivot);

    this.rightArmPivot = new THREE.Group();
    this.rightArmPivot.position.set(0.25, 0.42, 0);
    this.torso.add(this.rightArmPivot);

    const armGeoBone = new THREE.BoxGeometry(0.09, 0.46, 0.09);
    armGeoBone.translate(0, -0.22, 0);

    const lArmMesh = new THREE.Mesh(armGeoBone, this.materials.skin);
    lArmMesh.castShadow = true;
    this.leftArmPivot.add(lArmMesh);

    const rArmMesh = new THREE.Mesh(armGeoBone, this.materials.skin);
    rArmMesh.castShadow = true;
    this.rightArmPivot.add(rArmMesh);

    // Hand palms
    const handGeo = new THREE.SphereGeometry(0.06, 8, 8);
    handGeo.scale(0.8, 1.2, 0.9);
    const lHand = new THREE.Mesh(handGeo, this.materials.skin);
    lHand.position.set(0, -0.46, 0.02);
    this.leftArmPivot.add(lHand);

    const rHand = new THREE.Mesh(handGeo, this.materials.skin);
    rHand.position.set(0, -0.46, 0.02);
    this.rightArmPivot.add(rHand);

    // GANDHIJI'S ICONIC BAMBOO WALKING STICK (LATHI)
    // Firmly held in the right hand, assisting his purposeful stride
    this.lathiGroup = new THREE.Group();
    this.lathiGroup.position.set(0, -0.46, 0.05);

    // Bamboo stick pole
    const stickGeo = new THREE.CylinderGeometry(0.022, 0.026, 1.35, 8);
    stickGeo.translate(0, 0.15, 0);
    const stickMesh = new THREE.Mesh(stickGeo, this.materials.lathi);
    stickMesh.castShadow = true;
    this.lathiGroup.add(stickMesh);

    // Bamboo nodes/joints
    for (let k = -2; k <= 3; k++) {
      const nodeGeo = new THREE.TorusGeometry(0.028, 0.007, 6, 12);
      nodeGeo.rotateX(Math.PI / 2);
      const nodeMesh = new THREE.Mesh(nodeGeo, this.materials.lathi);
      nodeMesh.position.set(0, 0.15 + k * 0.22, 0);
      this.lathiGroup.add(nodeMesh);
    }

    // Gentle curved cane head
    const caneHeadGeo = new THREE.TorusGeometry(0.06, 0.022, 6, 12, Math.PI * 0.7);
    caneHeadGeo.rotateZ(Math.PI);
    const caneHead = new THREE.Mesh(caneHeadGeo, this.materials.lathi);
    caneHead.position.set(0.04, 0.82, 0);
    this.lathiGroup.add(caneHead);

    this.rightArmPivot.add(this.lathiGroup);

    // LEGS & KHADI DHOTI DRAPES
    this.leftLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(-0.13, 0, 0);
    this.hips.add(this.leftLegPivot);

    this.rightLegPivot = new THREE.Group();
    this.rightLegPivot.position.set(0.13, 0, 0);
    this.hips.add(this.rightLegPivot);

    // Upper Leg (wrapped in white khadi dhoti cloth)
    const upperLegGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.46, 12);
    upperLegGeo.translate(0, -0.22, 0);

    const lUpperLeg = new THREE.Mesh(upperLegGeo, this.materials.dhoti);
    lUpperLeg.castShadow = true;
    this.leftLegPivot.add(lUpperLeg);

    const rUpperLeg = new THREE.Mesh(upperLegGeo, this.materials.dhoti);
    rUpperLeg.castShadow = true;
    this.rightLegPivot.add(rUpperLeg);

    // Forelegs / Shins (Bare legs below dhoti)
    this.leftForeleg = new THREE.Group();
    this.leftForeleg.position.set(0, -0.44, 0);
    this.leftLegPivot.add(this.leftForeleg);

    this.rightForeleg = new THREE.Group();
    this.rightForeleg.position.set(0, -0.44, 0);
    this.rightLegPivot.add(this.rightForeleg);

    const shinGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.44, 10);
    shinGeo.translate(0, -0.22, 0);
    const lShin = new THREE.Mesh(shinGeo, this.materials.skin);
    lShin.castShadow = true;
    this.leftForeleg.add(lShin);

    const rShin = new THREE.Mesh(shinGeo, this.materials.skin);
    rShin.castShadow = true;
    this.rightForeleg.add(rShin);

    // TRADITIONAL INDIAN CHAPPALS (LEATHER SANDALS)
    const soleGeo = new THREE.BoxGeometry(0.15, 0.04, 0.32);
    soleGeo.translate(0, -0.46, 0.06);

    const lSole = new THREE.Mesh(soleGeo, this.materials.sandals);
    lSole.castShadow = true;
    this.leftForeleg.add(lSole);

    const rSole = new THREE.Mesh(soleGeo, this.materials.sandals);
    rSole.castShadow = true;
    this.rightForeleg.add(rSole);

    // Traditional Thong / Strap
    const strapGeo = new THREE.TorusGeometry(0.065, 0.015, 6, 12, Math.PI);
    strapGeo.rotateX(Math.PI / 2);
    strapGeo.translate(0, -0.43, 0.06);

    const lStrap = new THREE.Mesh(strapGeo, this.materials.sandals);
    this.leftForeleg.add(lStrap);

    const rStrap = new THREE.Mesh(strapGeo, this.materials.sandals);
    this.rightForeleg.add(rStrap);

    // SATYAGRAHA PEACE AURA (Radiates during slide or powerup)
    const auraGeo = new THREE.CylinderGeometry(0.5, 0.75, 0.25, 16);
    const auraMat = new THREE.MeshBasicMaterial({
      color: this.skinPalette.glow,
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    this.peaceAura = new THREE.Mesh(auraGeo, auraMat);
    this.peaceAura.position.set(0, 0.1, 0);
    this.group.add(this.peaceAura);

    // Turn character to face down the track
    this.group.rotation.y = Math.PI;
  }

  public setSkin(skinKey: CharacterSkin) {
    this.skinPalette = SKINS[skinKey];
    this.materials.skin.color.setHex(this.skinPalette.skin);
    this.materials.khadiShawl.color.setHex(this.skinPalette.khadi);
    this.materials.dhoti.color.setHex(this.skinPalette.dhoti);
    this.materials.sandals.color.setHex(this.skinPalette.sandals);
    this.materials.glasses.color.setHex(this.skinPalette.glasses);
    this.materials.lathi.color.setHex(this.skinPalette.stick);
    (this.peaceAura.material as THREE.MeshBasicMaterial).color.setHex(this.skinPalette.glow);
  }

  /**
   * Update animation state based on gameplay mode
   * Reflects Gandhiji's famous swift, energetic walking/running pace with walking stick (Lathi)
   */
  public update(
    delta: number,
    state: 'running' | 'jumping' | 'sliding' | 'crashed' | 'idle',
    speed: number,
    jumpProgress: number = 0,
    isDoubleJump: boolean = false
  ) {
    const runFreq = speed * 0.52;
    this.runTime += delta * runFreq;

    if (state === 'running') {
      this.flipAngle = 0;
      this.rootPivot.position.y = 0;
      this.rootPivot.rotation.x = 0.12; // Forward purposeful stride
      this.rootPivot.rotation.z = 0;
      (this.peaceAura.material as THREE.MeshBasicMaterial).opacity = 0;

      // Leg swing (brisk energetic stride)
      const legAngle = Math.sin(this.runTime) * 0.72;
      this.leftLegPivot.rotation.x = legAngle;
      this.rightLegPivot.rotation.x = -legAngle;

      // Knee bend on back swing
      this.leftForeleg.rotation.x = Math.max(0, -legAngle * 1.15);
      this.rightForeleg.rotation.x = Math.max(0, legAngle * 1.15);

      // Left Arm swings freely
      this.leftArmPivot.rotation.x = -legAngle * 0.85;
      this.leftArmPivot.rotation.z = -0.15;

      // Right Arm rhythmically plants the Lathi (walking stick)
      this.rightArmPivot.rotation.x = legAngle * 0.55 - 0.2;
      this.rightArmPivot.rotation.z = 0.15;
      this.lathiGroup.rotation.x = -legAngle * 0.45;

      // Gentle natural torso bounce and shawl billow
      const bounce = Math.abs(Math.sin(this.runTime * 2)) * 0.07;
      this.hips.position.y = 0.95 + bounce;
      this.torso.rotation.y = Math.sin(this.runTime) * 0.1;
      this.shawlMesh.rotation.y = Math.sin(this.runTime) * 0.15;
      this.head.rotation.x = -0.12 - bounce * 0.4;

    } else if (state === 'jumping') {
      (this.peaceAura.material as THREE.MeshBasicMaterial).opacity = 0;

      if (isDoubleJump) {
        // Graceful 360 front-flip with glowing peaceful spin
        this.flipAngle += delta * 12;
        this.rootPivot.rotation.x = this.flipAngle;
        this.rootPivot.position.y = 0;

        // Tuck limbs smoothly
        this.leftLegPivot.rotation.x = 1.1;
        this.rightLegPivot.rotation.x = 1.1;
        this.leftForeleg.rotation.x = 1.4;
        this.rightForeleg.rotation.x = 1.4;
        this.leftArmPivot.rotation.x = 1.2;
        this.rightArmPivot.rotation.x = 1.2;
      } else {
        this.flipAngle = 0;
        this.rootPivot.rotation.x = -0.1;
        this.rootPivot.position.y = 0;

        // Dynamic jump pose: holding walking stick high!
        this.leftLegPivot.rotation.x = -0.5;
        this.rightLegPivot.rotation.x = 0.7;
        this.leftForeleg.rotation.x = 0.3;
        this.rightForeleg.rotation.x = 1.2;

        this.leftArmPivot.rotation.x = -1.4;
        this.rightArmPivot.rotation.x = -1.6; // Stick pointed forward/up
        this.lathiGroup.rotation.x = 0.4;
      }

    } else if (state === 'sliding') {
      this.flipAngle = 0;
      // Drop low to ground, shawl wrapped close
      this.rootPivot.position.y = -0.55;
      this.rootPivot.rotation.x = -0.8;
      this.rootPivot.rotation.z = 0.1;

      // Satyagraha peace aura radiates
      (this.peaceAura.material as THREE.MeshBasicMaterial).opacity = 0.7;
      this.peaceAura.rotation.y += delta * 8;

      // Front leg extended, back knee bent
      this.leftLegPivot.rotation.x = -1.35;
      this.leftForeleg.rotation.x = 0.1;

      this.rightLegPivot.rotation.x = 0.55;
      this.rightForeleg.rotation.x = 1.7;

      // Lathi held parallel to the ground
      this.leftArmPivot.rotation.set(0.3, 0, -0.6);
      this.rightArmPivot.rotation.set(-0.6, 0, 0.4);
      this.lathiGroup.rotation.x = 1.2;

      this.head.rotation.x = 0.65;

    } else if (state === 'crashed') {
      // Gentle tumble back
      this.rootPivot.position.y = -0.4;
      this.rootPivot.rotation.x = THREE.MathUtils.damp(this.rootPivot.rotation.x, -1.7, 10, delta);
      this.rootPivot.rotation.z = THREE.MathUtils.damp(this.rootPivot.rotation.z, 0.7, 8, delta);
      (this.peaceAura.material as THREE.MeshBasicMaterial).opacity = 0;

      this.leftArmPivot.rotation.set(-1.1, 0, -0.8);
      this.rightArmPivot.rotation.set(-1.2, 0, 0.8);
      this.leftLegPivot.rotation.set(0.7, 0, -0.5);
      this.rightLegPivot.rotation.set(-0.4, 0, 0.5);

    } else if (state === 'idle') {
      this.flipAngle = 0;
      this.rootPivot.position.y = 0;
      this.rootPivot.rotation.set(0, 0, 0);
      (this.peaceAura.material as THREE.MeshBasicMaterial).opacity = 0;

      // Gentle, serene standing pose resting gently on his Lathi
      const breath = Math.sin(this.runTime * 0.8) * 0.04;
      this.hips.position.y = 0.95 + breath;
      this.torso.rotation.set(0, 0, 0);
      this.head.rotation.set(breath * 0.4, 0, 0);

      this.leftArmPivot.rotation.set(0.1, 0, -0.15);
      this.rightArmPivot.rotation.set(0.2, 0, 0.2);
      this.lathiGroup.rotation.x = 0.05;

      this.leftLegPivot.rotation.set(0, 0, 0);
      this.rightLegPivot.rotation.set(0, 0, 0);
      this.leftForeleg.rotation.set(0, 0, 0);
      this.rightForeleg.rotation.set(0, 0, 0);
    }
  }

  public dispose() {
    Object.values(this.materials).forEach(mat => {
      if (mat.map) mat.map.dispose();
      mat.dispose();
    });
  }
}
