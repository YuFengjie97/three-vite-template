/**
 * 基础事件映射约束
 * 使用 any 替代 any[] 以兼容更灵活的接口定义
 */
type EventMap = Record<string, any>;

export class EventEmitter<T extends EventMap> {
  private _listeners = new Map<keyof T, Set<(...args: any[]) => void>>();

  /**
   * 监听事件
   */
  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event)!.add(listener as any);
  }

  /**
   * 移除监听
   */
  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const listeners = this._listeners.get(event);
    if (listeners) {
      listeners.delete(listener as any);
      if (listeners.size === 0) {
        this._listeners.delete(event);
      }
    }
  }

  /**
   * 触发事件
   */
  emit<K extends keyof T>(event: K, ...args: T[K]): void {
    const listeners = this._listeners.get(event);
    if (listeners) {
      // 这里的副本创建保证了高频调用下的执行稳定性
      const listenersCopy = Array.from(listeners);
      listenersCopy.forEach(listener => listener(...args));
    }
  }

  /**
   * 一次性监听
   */
  once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): void {
    const wrapper = (...args: T[K]) => {
      this.off(event, wrapper);
      listener(...args);
    };
    this.on(event, wrapper);
  }

  /**
   * 清除所有监听
   */
  removeAllListeners(): void {
    this._listeners.clear();
  }
}

/**
 * 定义全局事件接口
 * 使用具名元组 [name: Type] 可以在输入代码时获得精准的参数提示
 */
export interface AppEvents {
  // 每一帧触发，带上时间参数
  'animate': [data: { delta: number; elapsed: number }];
  // 资源加载进度
  'progress': [percent: number];
  // 窗口缩放
  'resize': [width: number, height: number];
  // 场景初始化完成
  'init_complete': [];
}

export const ee = new EventEmitter<AppEvents>();