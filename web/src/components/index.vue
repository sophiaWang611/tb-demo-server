<template>
    <div class="index">
      <div class="board-view">
        <div class="board-scrum-view fade in">
          <ul class="board-scrum-stages horizontal-scroll ui-sortable sortable">
            <li v-for="item in list" class="scrum-stage toggler-parent reached-top fixed-creator">
              <header class="scrum-stage-header ui-sortable-handle">
                <div class="stage-name hinted">
                  <span class="icon icon-tick"></span>{{item.headerName}}
                  <span class="task-count"> · {{item.tasks.length + item.doneTasks.length}}</span>
                </div>
              </header>
              <div class="scrum-stage-wrap hidden-creator ui-sortable">
                <section class="scrum-stage-content thin-scroll">
                  <TaskItem :tasks="item.tasks" target=""></TaskItem>
                  <TaskItem :tasks="item.doneTasks" target="done"></TaskItem>
                </section>
              </div>
            </li>
            <li class="locked-stage scrum-stage toggler-parent stage-add-view">
              <div class="handler-wrap">
                <a class="expand-creator-handler"><span class="icon icon-plus"></span>新建任务列表...</a>
              </div>
              <div class="creator-wrap hidden">
                <input type="text" placeholder="新建任务列表..." class="form-control stage-name">
                <div class="buttons">
                  <a class="btn btn-link contract-creator-handler">取消</a>
                  <a class="btn btn-primary submit-add-stage">保存</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue, {ComponentOptions} from "vue"
  import TaskItem from "./task-item.vue"

  export default {
    name: "index",
    components: {
      TaskItem
    },
    data() {
      return {
        list: []
      }
    }
  } as ComponentOptions<Vue>
</script>

<style>

</style>
