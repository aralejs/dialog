# AnimDialog 使用文档

- order: 1

---

动画对话框组件，提供了对话框弹出的动画效果。目前支持的动画效果有四种：无动画，渐隐，滑动，移动。

---

## 配置说明

### effect *object*

    显隐效果配置，形似

        {
            type: 'move',       // 动画种类，可选 none|fade|slide|move
            duration: 400,      // 动画时长
            from: 'up',         // 动画方向，当 type 为 slide|move 时有效
            easing: 'easeOut'   // 支持常用的平滑函数
        }

### showEffect *object*

    显示时的动画效果，若设为 null，则表示动画种类为 none。

### hideHffect *object*

    隐藏时的动画效果，若设为 null，则表示动画种类为 none。

