from manim import *

class Measurement(Scene):
   def construct(self):
      line = Line(LEFT-(6,0,0), RIGHT+(6,0,0), color=BLACK)
      rect = Rectangle(height=2., width=2).set_fill(GREEN_C, opacity=1)
      text = Text("M", color=BLACK, font_size=72)
      res0 = Text("0", font_size=54, color=BLUE).set_z_index(-1)
      res1 = Text("1", font_size=54, color=BLUE).set_z_index(-1)
      lab = VGroup(line, rect, res0, text)
      lab1 = VGroup(line.copy(), rect.copy(), res1, text.copy())
      lab1.move_to(DOWN)
      self.add(lab)
      pos_0 = LEFT-(5.5, -0.6, 0)
      pos_1 = LEFT+(7.5, 0.6, 0)
      mid = 0.5 * (pos_0 + pos_1)
      instate = Tex("$|+\\rangle$", color=RED, font_size=81).move_to(pos_0)
      instate.set_z_index(-1)
      outstate = Tex("$|0\\rangle$", color=RED, font_size=81).move_to(pos_1)
      outstate.set_z_index(-1)
      instate1 = instate.copy().move_to(mid)
      outstate1 = outstate.copy().move_to(mid)
      states = VGroup(instate, instate1, outstate, outstate1)
      #self.add(states)
      self.play(ReplacementTransform(instate, instate1, run_time=2))
      self.play(res0.animate.move_to(1.5*UP))
      self.play(ReplacementTransform(outstate1, outstate, run_time=2))
      gr0 = lab + states
      gr0.add(instate.copy().move_to(pos_0).set(color=GRAY))
      self.play(gr0.animate.shift(2.5*UP))
      i0 = instate.copy().move_to(pos_0+DOWN)
      i1 = instate1.copy().move_to(mid+DOWN)
      o0 = Tex("$|1\\rangle$", color=RED, font_size=81).move_to(pos_1+DOWN)
      o1 = o0.copy().move_to(mid+DOWN)
      o0.set_z_index(-1)
      o1.set_z_index(-1)
      o0.set(tex_string="$|1\\rangle$")
      o1.set(tex_string="$|1\\rangle$")
      print(o1)
      self.add(lab1)
      states1 = VGroup(i0, i1, o0, o1)
      gr1 = lab1 + states1
      self.play(ReplacementTransform(i0, i1, run_time=2))
      self.play(res1.animate.move_to(0.5*UP))
      self.play(ReplacementTransform(o1, o0, run_time=2))
      gr1.add(i0.copy().move_to(pos_0+DOWN).set(color=GRAY))
      self.play(gr1.animate.shift(1.5*DOWN))
      self.wait()
#
config.background_color = BLUE_A
config.frame_height = 9
config.frame_width = 16
config.output_file='measurement.mp4'