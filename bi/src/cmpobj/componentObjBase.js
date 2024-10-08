import { extend } from "quasar";
import dockEnum from "src/enums/dockEnum";
import Common from "src/utils/common";
export default class ComponentObjBase {
  parent;
  parentUid;
  uid;
  name;
  w;
  h;
  x;
  y;
  dock;
  anchor;
  zIndex;
  isDesign;
  lock;
  canDrop;
  showDropState;
  canDrag;
  canMove;
  canReSize;
  borderStyle;
  backgroundStyle;
  type;
  eventBus;

  constructor() {
    this.parent = null;
    this.parentUid = "";
    this.uid = Common.getUid();

    this.name = "";
    this.w = 100;
    this.h = 100;
    this.x = 0;
    this.y = 0;
    this.dock = dockEnum.None.value;
    this.anchor = [];
    this.zIndex = 0;
    this.isDesign = true;
    this.canDrop = false;
    this.canDrag = true;
    this.canMove = true;
    this.canReSize = true;
    this.lock = false;
    this.showDropState = false;
    this.borderStyle = {
      borderType: "normal", //normal:传统边框 //decoration:装饰器,
      borderSide: "all", //all:全部边框，single//勾选单个边框
      borderRadius: 0, //圆角
      allSetting: {
        style: "solid",
        width: 0,
        color: "#000000",
        padding: 0,
      },
      singleSetting: [
        {
          name: "Left",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Top",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Right",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
        {
          name: "Bottom",
          check: false,
          style: "solid",
          width: 0,
          color: "#000000",
          padding: 0,
        },
      ],
      decorationSetting: {
        style: "1", //边框样式编号
        borderConfig: {
          color1: "#4fd2dd",
          color2: "#235fa7",
          reverse: false,
          needResize: true,
          backgroundColor: "transparent",
          title: "标题",
          titleWidth: 250,
          titleStyle: {
            fontSize: 18,
            textAlign: "center",
            color: "#fff",
            fontWeight: "normal",
          },
          dur: 3,
        },
        padding: [15, 15, 15, 15],
      },
    };
    this.backgroundStyle = {
      color: "#ffffff00",
      image: {
        url: "",
        repeat: "stretch",
        opacity: 100,
      },
    };
  }

  load(config) {
    for (let key in config) {
      if (key in this) {
        if (key === "childs") {
          config[key].forEach((x) => {
            let cmpObj = Common.createCmpObjByType(x.type);
            cmpObj.eventBus = this.eventBus;
            cmpObj.load(x);
            cmpObj.parent = this;
            cmpObj.parentUid = this.uid;
            cmpObj.isDesign = this.isDesign;
            this.childs.push(cmpObj);
          });
        } else {
          this[key] = config[key];
        }
      }
    }
  }
  safeCopy(value) {
    if (Array.isArray(value)) {
      return extend(true, [], value);
    } else if (typeof value === "object") {
      return extend(true, {}, value);
    } else {
      return value;
    }
  }
  getNotSaveProperties() {
    let notSave = [
      "parent",
      "isDesign",
      "lock",
      "eventBus",
      "canDrop",
      "canDrag",
      "canMove",
      "canReSize",
      "showDropState",
    ];
    return notSave;
  }
  save() {
    let notSave = this.getNotSaveProperties();
    let config = {};
    for (let key in this) {
      if (!notSave.includes(key)) {
        config[key] = this.safeCopy(this[key]);
      }
    }

    if (this.childs && this.childs.length > 0) {
      config.childs = [];
      this.childs.forEach((x) => {
        let childConfig = x.save();
        config.childs.push(childConfig);
      });
    }

    return config;
  }
}
